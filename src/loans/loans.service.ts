import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { CreateInstallmentDto } from './dto/installments.dto';
import { Installment } from './entities/installment.entity';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(Loan.name) private loanModel: Model<Loan>,
    @InjectModel(Installment.name) private installmentModel: Model<Installment>,
  ) {}

  async create(createLoanDto: CreateLoanDto, user: JwtPayload) {
    const { amount, name, idNo, phoneNo } = createLoanDto;
    const dateOfIssue = new Date();

    const loan = new this.loanModel({
      amount,
      name,
      idNo,
      phoneNo,
      dateOfIssue,
      user: user._id,
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

  async findAll() {
    return await this.loanModel.find().exec();
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

  async update(id: string, amount: number) {
    const loan = await this.loanModel.findById(id).exec();

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    if (amount > loan.amount) {
      throw new Error(
        `Amount to be paid exceeds remaining debt ${loan.amount}`,
      );
    } else if (amount === loan.amount) {
      loan.amount = 0;
      await loan.save();
      return 'Loan has been fully paid successfully';
    } else {
      loan.amount -= amount;
      await loan.save();
      return `Loan has been partially paid. Remaining debt is ${loan.amount}`;
    }
  }
}
