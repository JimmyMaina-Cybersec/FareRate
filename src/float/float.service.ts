import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFloatDto } from './dto/create-float.dto';
import { UpdateFloatDto } from './dto/update-float.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Float } from './entities/float.entity';
import { FloatDocument } from './schma/float.schema';
import PaginationQueryType from 'src/types/paginationQuery';
import { ShifFloatDto } from './dto/shiftFloat.dto';

@Injectable()
export class FloatService {
  constructor(
    @InjectModel(Float.name)
    private readonly floatModel: Model<FloatDocument>,
  ) { }

  async create(
    createFloatDto: CreateFloatDto,
    user: JwtPayload,
  ): Promise<FloatDocument> {
    if (user.role == 'admin' || user.role == 'service agent') {
      const exists = await this.floatModel.exists({
        currency: createFloatDto.currency,
        status: 'active',
        serviceAgent: createFloatDto.serviceAgent,
      });

      if (exists) {
        throw new ConflictException('Float already exists and is active');
      }

      return this.floatModel.create({
        ...createFloatDto,
        currentAmount: createFloatDto.initialmount,
        createdBy: user._id,
        serviceAgent: createFloatDto.serviceAgent,
      });
    }

    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  async findAll(
    user: JwtPayload,
    query: PaginationQueryType,
    filters: {
      status?: string;
      serviceAgent?: string;
    },
  ): Promise<{
    data: FloatDocument[];
    page: number;
    resPerPage: number;
    numberOfPages: number;
  }> {
    const currentPage = query.page ?? 1;
    const resPerPage = query.resPerPage ?? 20;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role == 'admin' || user.role == 'service agent') {
      const floats = await this.floatModel
        .find({ ...filters })
        .select('-__v')
        .limit(resPerPage)
        .sort({ createdAt: -1 })
        .skip(skip)
        .exec();
      const count = await this.floatModel.countDocuments({ ...filters }).exec();
      return {
        data: floats,
        page: currentPage,
        resPerPage: resPerPage,
        numberOfPages: Math.ceil(count / resPerPage),
      };
    }

    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  async update(id: string, updateFloatDto: UpdateFloatDto, user: JwtPayload) {
    if (user.role == 'admin' || user.role == 'service agent') {
      const currentFloat = await this.floatModel.findById(id).exec();
      if (currentFloat.status != 'active') {
        throw new HttpException('Float is not active', HttpStatus.FORBIDDEN);
      }
      return currentFloat
        .updateOne(
          {
            ...updateFloatDto,
            currentAmount:
              updateFloatDto.addedAmount + currentFloat.currentAmount,
            initialmount:
              updateFloatDto.addedAmount + currentFloat.initialmount,
            updatedBy: user._id,
            updatedAt: new Date(),
          },
          { new: true },
        )
        .exec();
    }
    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  async closeFloat(id: string, user: JwtPayload) {
    if (user.role == 'admin' || user.role == 'super user') {
      return this.floatModel
        .updateMany(
          { serviceAgent: id, status: 'active' },
          {
            status: 'closed',
            closedBy: user._id,
            closedAt: new Date(),
          },
          { new: true },
        )
        .exec();
    }
    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  remove(id: string, user: JwtPayload) {
    if (user.role == 'admin' || user.role == 'super user') {
      return this.floatModel.findByIdAndDelete(id).exec();
    }
    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  async shiftFloat(user: JwtPayload, shiftFloatDTO: ShifFloatDto) {
    if (user.role != 'admin') {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const openFloatsOnNewServiceAgentExist = await this.floatModel.exists({
      status: 'active',
      serviceAgent: shiftFloatDTO.agentStartingShift,
    }).exec();

    if (openFloatsOnNewServiceAgentExist) {
      throw new ConflictException(
        'There are open floats on the new service agent',
      );
    }



    const openFloatsOnOldServiceAgentExist = await this.floatModel.exists({
      status: 'active',
      serviceAgent: shiftFloatDTO.agentEndingShift,
    }).exec();

    if (!openFloatsOnOldServiceAgentExist) {
      throw new ConflictException(
        'There are no open floats on the old service agent',
      );
    }

    const oldFloats = await this.floatModel
      .find({
        status: 'active',
        serviceAgent: shiftFloatDTO.agentEndingShift,
      }).exec();
    // 
    // create new float for the new service agent
    // close the old float

    const newFloats = oldFloats.map((float) => {
      return {
        ...float,
        status: 'active',
        initialmount: float.currentAmount,
        addedAmount: 0,
        _id: null,
        serviceAgent: shiftFloatDTO.agentStartingShift,
        createdBy: user._id,
        createdAt: new Date(),
        updatedBy: user._id,
        updatedAt: new Date(),
      };
    }

    );

    const closedFloats = oldFloats.map((float) => {
      return {
        ...float,
        status: 'closed',
        closedBy: user._id,
        closedAt: new Date(),
      };
    }

    );

    const newFloatsCreated = await this.floatModel.insertMany(newFloats);
    const oldFloatsClosed = await this.floatModel.updateMany(
      {
        status: 'active',
        serviceAgent: shiftFloatDTO.agentEndingShift,
      },
      {
        status: 'closed',
        closedBy: user._id,
        closedAt: new Date(),
      },
      { new: true },
    ).exec();

    return {
      newFloatsCreated,
      oldFloatsClosed,
    };





  }
}
