import { Injectable } from '@nestjs/common';
import { CreateTransactionRateDto } from './dto/create-transaction-rate.dto';
import { UpdateTransactionRateDto } from './dto/update-transaction-rate.dto';

@Injectable()
export class TransactionRateService {
  create(createTransactionRateDto: CreateTransactionRateDto) {
    return 'This action adds a new transactionRate';
  }

  findAll() {
    return `This action returns all transactionRate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionRate`;
  }

  update(id: number, updateTransactionRateDto: UpdateTransactionRateDto) {
    return `This action updates a #${id} transactionRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionRate`;
  }
}
