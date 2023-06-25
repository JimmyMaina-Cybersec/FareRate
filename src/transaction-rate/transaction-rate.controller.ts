import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionRateService } from './transaction-rate.service';
import { CreateTransactionRateDto } from './dto/create-transaction-rate.dto';
import { UpdateTransactionRateDto } from './dto/update-transaction-rate.dto';

@Controller('transaction-rate')
export class TransactionRateController {
  constructor(private readonly transactionRateService: TransactionRateService) {}

  @Post()
  create(@Body() createTransactionRateDto: CreateTransactionRateDto) {
    return this.transactionRateService.create(createTransactionRateDto);
  }

  @Get()
  findAll() {
    return this.transactionRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionRateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionRateDto: UpdateTransactionRateDto) {
    return this.transactionRateService.update(+id, updateTransactionRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionRateService.remove(+id);
  }
}
