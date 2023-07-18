import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { CreateInstallmentDto } from './dto/installments.dto';
import { Installment } from './entities/installment.entity';
import { JwtPayload } from 'src/types/jwt-payload';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(Loan.name) private loanModel: Model<Loan>,
    @InjectModel(Installment.name) private installmentModel: Model<Installment>,
  ) { }


  async create(createLoanDto: CreateLoanDto, user: JwtPayload) {
    const { amount, name, idNo, phoneNo } = createLoanDto;
    const dateOfIssue = new Date();


    const loan = new this.loanModel({
      amount,
      name,
      idNo,
      phoneNo,
      dateOfIssue,
      createdBy: user._id,
      shop: user.shop,
    });

    return await loan.save();
  }

  async createInstallment(
    loanId: string,
    createInstallmentDto: CreateInstallmentDto,
  ) {
    const { amountPaid, user } = createInstallmentDto;

    const installment = new this.installmentModel({
      amountPaid,
      user,
      loan: loanId,
    });

    return await installment.save();
  }

  async findAll(user: JwtPayload, filters: { shop?: String; agent?: string, page: number, resPerPage: number }) {
    if (user.role === 'admin') {
      return await this.loanModel.find().populate('createdBy').exec();
    }
    return await this.loanModel.find({ createdBy: user._id }).exec();

  }

  async findPendingLoansByIdNo(idNo: string) {
    const loans = await this.loanModel
      .find({ idNo, amount: { $gt: 0 } })
      .exec();
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
        throw new NotFoundException(`Loan with ID ${loanId} not found`);
      }

      if (updateLoanDTO.amount > loan.balance) {
        throw new Error(
          `Amount to be paid exceeds remaining debt ${loan.balance}`,
        );

      }

      const installment = await new this.installmentModel({
        amountPaid: updateLoanDTO.amount,
        user: user._id,
        shop: user.shop,
        loan: loanId,
        balance: loan.balance - updateLoanDTO.amount,
      }).save();

      if (loan.balance === updateLoanDTO.amount) {
        loan.status = 'paid';
      } else {
        loan.status = 'unpaid';
      }
      const updatedLoan = await this.loanModel.findByIdAndUpdate(loanId, {
        $inc: { balance: -updateLoanDTO.amount },
        $push: { installments: installment._id },
        status: loan.status
      }, { new: true });

      return updatedLoan;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
