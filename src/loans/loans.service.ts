import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { Installment } from './entities/installment.entity';
import { JwtPayload } from 'src/types/jwt-payload';
import { UpdateLoanDto } from './dto/update-loan.dto';
import PaginationQueryType from '../types/paginationQuery';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(Loan.name) private loanModel: Model<Loan>,
    @InjectModel(Installment.name) private installmentModel: Model<Installment>,
  ) {}

  async create(createLoanDto: CreateLoanDto, user: JwtPayload) {
    try {
      console.log(user);
      const loan = new this.loanModel({
        ...createLoanDto,
        balance: createLoanDto.totalLoan,
        createdBy: user._id,
        shop: user.shop,
      });

      return await loan.save();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    user: JwtPayload,
    filters: {
      shop?: string;
      createdBy?: string;
    },
    paginationQuery: PaginationQueryType,
  ) {
    const currentPage = paginationQuery.page ?? 1;
    const resPerPage = paginationQuery.resPerPage ?? 20;
    const skip = (currentPage - 1) * resPerPage;

    let docsCount = 0;

    if (user.role === 'admin') {
      docsCount = await this.loanModel.countDocuments({
        ...filters,
      });

      return {
        data: await this.loanModel
          .find({
            ...filters,
          })
          .populate(
            'createdBy',
            '-refreshToken -updatedAt -createdAt -createdBy -shop',
          )
          .limit(resPerPage)
          .sort({ createdAt: -1 })
          .skip(skip)
          .exec(),
        page: currentPage,
        resPerPage,
        numberOfPages: Math.ceil(docsCount / resPerPage),
      };
    }
    return {
      data: await this.loanModel
        .find({ createdBy: user._id })
        .limit(resPerPage)
        .sort({ createdAt: -1 })
        .skip(skip)
        .exec(),
      page: currentPage,
      resPerPage,
      numberOfPages: Math.ceil(docsCount / resPerPage),
    };
  }

  async findPendingLoansByIdNo(idNo: string) {
    const loans = await this.loanModel.find({ customerIdNo: idNo }).exec();
    if (loans.length === 0) {
      throw new NotFoundException(
        `No loans found for this user with ID No. ${idNo}`,
      );
    }
    return loans;
  }

  async update(loanId: string, updateLoanDTO: UpdateLoanDto, user: JwtPayload) {
    try {
      const loan = await this.loanModel.findById(loanId).exec();

      if (!loan) {
        return new NotFoundException(`Loan with ID ${loanId} not found`);
      }

      if (updateLoanDTO.amountPaid > loan.balance) {
        throw new ConflictException(
          `Amount to be paid exceeds remaining debt ${loan.balance}`,
        );
      }

      const installment = await new this.installmentModel({
        amountPaid: updateLoanDTO.amountPaid,
        user: user._id,
        shop: user.shop,
        loan: loanId,
        balance: loan.balance - updateLoanDTO.amountPaid,
      }).save();

      if (loan.balance === updateLoanDTO.amountPaid) {
        loan.status = 'paid';
      } else {
        loan.status = 'partially paid';
      }
      return await this.loanModel.findByIdAndUpdate(
        loanId,
        {
          $inc: { balance: -updateLoanDTO.amountPaid },
          $push: { installments: installment._id },
          status: loan.status,
        },
        { new: true },
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
