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
import { Loanee } from '../loanees/entities/loanee.entity';
import { Shop } from '../shops/schema/shop.schma';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(Loan.name)
    private loanModel: Model<Loan>,
    @InjectModel(Installment.name)
    private installmentModel: Model<Installment>,
    @InjectModel(Loanee.name)
    private loaneeModel: Model<Loanee>,
    @InjectModel(Shop.name)
    private shopModel: Model<Shop>,
  ) {}

  async create(createLoanDto: CreateLoanDto, user: JwtPayload) {
    try {
      const { loanee } = createLoanDto;
      const customer = await this.loaneeModel.exists({ _id: loanee });

      if (!customer) {
        throw new NotFoundException(
          'Loans are offered to registered customers',
        );
      }

      // TODO: Deal with loan capital
      // if (this.shopModel.loanMoney <= createLoanDto.loanAmount) {
      //   throw new UnauthorizedException(
      //     'Customer cannot be credited. insufficient loan capital',
      //   );
      // } else {
      const loan = new this.loanModel({
        ...createLoanDto,
        loanBalance: createLoanDto.loanAmount,
        createdBy: user._id,
        shop: user.shop,
      }).save();

      await this.loaneeModel
        .findOneAndUpdate(
          { loanee: loanee },
          { $inc: { totalBalance: createLoanDto.loanAmount } },
          { new: true },
        )
        .exec();

      // TODO: all loans have a currency
      // await this.shopModel
      //   .findOneAndUpdate(
      //     { _id: loan.shop },
      //     { $inc: { loanMoney: -loan.loanAmount } },
      //     { new: true },
      //   )
      //   .exec();

      return await loan;
      // }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    user: JwtPayload,
    filters: {
      shop?: string;
      createdBy?: string;
      loanee?: string;
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
          .populate('installments', '-updatedAt -__v')
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
    const loans = await this.loanModel.find({ customer: idNo }).exec();
    if (loans.length === 0) {
      throw new NotFoundException(`No loans found for this Loanee`);
    }
    return loans;
  }

  async update(loanId: string, updateLoanDTO: UpdateLoanDto, user: JwtPayload) {
    try {
      const loan = await this.loanModel.findById(loanId).exec();

      if (!loan) {
        return new NotFoundException(`Loan with ID ${loanId} not found`);
      }

      if (updateLoanDTO.amountPaid > loan.loanBalance) {
        return new ConflictException(
          `Amount to be paid exceeds remaining debt ${loan.loanBalance}`,
        );
      }

      const installment = await new this.installmentModel({
        amountPaid: updateLoanDTO.amountPaid,
        user: user._id,
        shop: user.shop,
        loan: loanId,
        remainingDebt: loan.loanBalance - updateLoanDTO.amountPaid,
      }).save();

      if (loan.loanBalance === updateLoanDTO.amountPaid) {
        loan.status = 'paid';
      } else {
        loan.status = 'partially paid';
      }
      await this.loanModel.findByIdAndUpdate(
        loanId,
        {
          $inc: { loanBalance: -updateLoanDTO.amountPaid },
          $push: { installments: installment._id },
          status: loan.status,
        },
        { new: true },
      );

      // TODO: Deal with loan capital and capital currency
      // await this.shopModel
      //   .findOneAndUpdate(
      //     { _id: loan.shop },
      //     { $inc: { loanMoney: updateLoanDTO.amountPaid } },
      //     { new: true },
      //   )
      //   .exec();

      return await this.loaneeModel
        .findByIdAndUpdate(
          loan.loanee,
          { $inc: { totalBalance: -updateLoanDTO.amountPaid } },
          { new: true },
        )
        .exec();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
