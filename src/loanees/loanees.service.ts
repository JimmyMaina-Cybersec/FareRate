import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  ) { }


  async create(createLoaneeDto: CreateLoaneeDto, user: JwtPayload) {
    if (user.role !== 'admin') {
      throw new UnauthorizedException('Only admins can create loanees');
    }
    try {
      return await new this.loaneeModel({
        ...createLoaneeDto,
        createdBy: user._id,
      }).save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Something went wrong', error.status ?? HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(pagination: PaginationQueryType, user: JwtPayload) {

    const currentPage = pagination.page ?? 1;
    const resPerPage = pagination.resPerPage ?? 20;
    const skip = (currentPage - 1) * resPerPage;

    let docsCount = 0;

    if (user.role === 'admin') {
      docsCount = await this.loaneeModel.countDocuments();
      return {
        docs: this.loaneeModel.find().skip(skip).limit(resPerPage),
        currentPage,
        resPerPage,
        docsCount,
      }
    }
    return new UnauthorizedException('Only admins can view all loanees')

  }

  async findOne(id: string) {
    const loanee = await this.loaneeModel.findOne({ customerIdNo: id }).exec()
    if (loanee._id) {
      return loanee
    }
    return new NotFoundException('Loanee not found')
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
