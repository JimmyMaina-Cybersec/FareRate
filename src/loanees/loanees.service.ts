import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLoaneeDto } from './dto/create-loanee.dto';
import { UpdateLoaneeDto } from './dto/update-loanee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loanee } from './entities/loanee.entity';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';

@Injectable()
export class LoaneesService {
  constructor(
    @InjectModel(Loanee.name)
    private loaneeModel: Model<Loanee>,
  ) {}

  async create(createLoaneeDto: CreateLoaneeDto, user: JwtPayload) {
    console.log(user);
    if (user.role !== 'admin') {
      throw new UnauthorizedException('Only admins can create loanees');
    }

    try {
      console.log(user);
      const loanee = new this.loaneeModel({
        ...createLoaneeDto,
        createdBy: user._id,
      });

      return await loanee.save();
    } catch (error: any) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(pagination: PaginationQueryType, user: JwtPayload) {
    try {
      const currentPage = pagination.page ?? 1;
      const resPerPage = pagination.resPerPage ?? 20;
      const skip = (currentPage - 1) * resPerPage;

      let docsCount = 0;
      console.log(user);

      if (user.role === 'admin') {
        docsCount = await this.loaneeModel.countDocuments();
        return {
          data: await this.loaneeModel.find().skip(skip).limit(resPerPage),
          page: currentPage,
          resPerPage: resPerPage,
          numberOfPages: Math.ceil(docsCount / resPerPage),
        };
      }
      return {
        data: [],
        page: 1,
        resPerPage: resPerPage,
        numberOfPages: 1,
      };
    } catch (error: any) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    const loanee = await this.loaneeModel.findOne({ customerIdNo: id }).exec();
    if (loanee._id) {
      return loanee;
    }
    return new NotFoundException('Loanee not found');
  }

  update(id: string, updateLoaneeDto: UpdateLoaneeDto) {
    return `This action updates a #${id} loanee`;
  }

  remove(id: string, user: JwtPayload) {
    if (user.role !== 'admin') {
      throw new UnauthorizedException('Only admins can delete loanees');
    }
    return this.loaneeModel.findByIdAndDelete(id).exec();
  }
}
