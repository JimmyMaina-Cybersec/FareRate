import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMobileMoneyDto } from './dto/create-mobile-money.dto';
import { UpdateMobileMoneyDto } from './dto/update-mobile-money.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobileMoney } from './entities/mobile-money.entity';
import PaginationQueryType from 'src/types/paginationQuery';

@Injectable()
export class MobileMoneyService {
  constructor(
    @InjectModel(MobileMoney.name)
    private mobileMoneyModel: Model<MobileMoney>,
  ) {}

  async create(createMobileMoneyDto: CreateMobileMoneyDto, user: JwtPayload) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can create mobile money');
    }

    const mob = await this.mobileMoneyModel.find({
      status: 'open',
      provider: createMobileMoneyDto.provider,
    });

    if (mob) {
      throw new ForbiddenException(
        'Mobile money already open for this provider',
      );
    }

    return await this.mobileMoneyModel.create({
      ...createMobileMoneyDto,
      assingnedBy: user._id,
      shop: user.shop,
    });
  }

  async findAll(
    user: JwtPayload,
    adminFilters: {
      shop?: string;
      createdBy?: string;
      status?: string;
      agent?: string;
      _id?: string;
      provider?: string;
    },
    agentFilters: {
      status?: string;
      _id?: string;
      provider?: string;
    },
    paginationQuery: PaginationQueryType,
  ) {
    const currentPage = paginationQuery.page ?? 1;
    const resPerPage = paginationQuery.resPerPage ?? 50;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role === 'admin') {
      const numberOfFloating = await this.mobileMoneyModel.countDocuments({
        ...adminFilters,
      });
      return {
        data: await this.mobileMoneyModel
          .find({ ...adminFilters })
          .populate('agent', ['firstName', 'lastName', 'phone', '_id', 'shop'])
          .populate('provider', ['name', '_id'])
          .populate('shop', ['name', '_id'])
          .sort({ createdAt: -1 })
          .select('-__v')
          .limit(resPerPage)
          .skip(skip)
          .exec(),

        page: paginationQuery.page ?? 1,
        resPerPage: paginationQuery.resPerPage ?? 50,
        numberOfPages: Math.ceil(numberOfFloating / resPerPage),
      };
    }

    const numberOfFloating = await this.mobileMoneyModel.countDocuments({
      agent: user._id,
      ...agentFilters,
    });
    return {
      data: await this.mobileMoneyModel
        .find({ ...agentFilters, agent: user._id })
        .sort({ createdAt: -1 })
        .select('-__v')
        .limit(resPerPage)
        .skip(skip)
        .exec(),

      page: paginationQuery.page ?? 1,
      resPerPage: paginationQuery.resPerPage ?? 50,
      numberOfPages: Math.ceil(numberOfFloating / resPerPage),
    };
  }

  findOne(id: string) {
    return this.mobileMoneyModel.findById(id);
  }

  async update(
    id: string,
    updateMobileMoneyDto: UpdateMobileMoneyDto,
    user: JwtPayload,
  ) {
    if (user.role == 'admin') {
      const mobileMoney = await this.mobileMoneyModel.findById(id);

      if (user._id == mobileMoney.agent) {
        return this.mobileMoneyModel.findByIdAndUpdate(
          id,
          {
            status: 'approved',
            closingAmount: updateMobileMoneyDto.amount,
          },
          { new: true },
        );
      }

      if (mobileMoney.agentClosingAmount == updateMobileMoneyDto.amount) {
        return this.mobileMoneyModel.findByIdAndUpdate(
          id,
          {
            status: 'approved',
            closingAmount: updateMobileMoneyDto.amount,
          },
          { new: true },
        );
      } else {
        return this.mobileMoneyModel.findByIdAndUpdate(
          id,
          {
            status: 'declined',
            closingAmount: updateMobileMoneyDto.amount,
          },
          { new: true },
        );
      }

      // return this.mobileMoneyModel.findByIdAndUpdate(
      //   id,
      //   {
      //     status: updateMobileMoneyDto.status,
      //     closingAmount: updateMobileMoneyDto.amount,
      //   },
      //   { new: true },
      // );
    }
    return this.mobileMoneyModel.findByIdAndUpdate(
      id,
      {
        status: 'awaiting approval',
        agentClosingAmount: updateMobileMoneyDto.amount,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string, user: JwtPayload) {
    if (user.role !== 'admin')
      return new UnauthorizedException('Onli Admins can delete this service');
    this.mobileMoneyModel.findByIdAndDelete().exec();
    return {
      message: 'deleted Successfully',
    };
  }
}
