import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class LoansService {
  constructor(@InjectModel(Loan.name) private loanModel: Model<Loan>) { }

  async create(createLoanDto: CreateLoanDto, request: Request) {
    const { amount, name, idNo, phoneNo } = createLoanDto;
    const dateOfIssue = new Date();

    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'b49f49e998433edb4c73bdc6def2eb4984349ba46fb9f76010762b5af56455bc441e1f340b2b13973527a45da82aa882da1b4d9fa6a659ab2881f23cd1a4fece') as { agentId: string; shopId: string };
    const agentId = decodedToken.agentId;
    const shopId = decodedToken.shopId;
    const id = uuid();

    const loan = new this.loanModel({
      _id: id,
      amount,
      name,
      idNo,
      phoneNo,
      dateOfIssue,
      agentId,
      shopId,
    });

    return await loan.save();
  }

  async findAll() {
    return await this.loanModel.find().exec();
  }

  async findOne(idNo: string) {
    const loans = await this.loanModel.find({ idNo, amount: { $gt: 0 } }).exec();
    if (loans.length === 0) {
      throw new NotFoundException(`No loans found for this user with ID No. ${idNo}`);
    }
    return loans;
  }

  async update(id: string, amount: number) {
    const loan = await this.loanModel.findById(id).exec();

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    if (amount > loan.amount) {
      throw new Error(`Amount to be paid exceeds remaining debt ${loan.amount}`);
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
