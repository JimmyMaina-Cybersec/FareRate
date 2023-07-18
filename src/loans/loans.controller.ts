import { Controller, Get, Post, Body, Param, Patch, Req } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Request } from 'express';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto, @Req() request: Request) {
    return this.loansService.create(createLoanDto, request);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch(':id/pay')
  update(@Param('id') id: string, @Body('amount') amount: number) {
    return this.loansService.update(id, amount);
  }
}
