import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CurrencyConversionsService } from './currency-conversions.service';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { UpdateCurrencyConversionDto } from './dto/update-currency-conversion.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { query } from 'express';
import PaginationQueryType from 'src/types/paginationQuery';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('currency-conversions')
export class CurrencyConversionsController {
  constructor(private readonly currencyConversionsService: CurrencyConversionsService) { }


  @Post('create')
  create(@Body() createCurrencyConversionDto: CreateCurrencyConversionDto, @CurrentUser() user: JwtPayload) {
    return this.currencyConversionsService.create(createCurrencyConversionDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() filters: { trasactionType?: String; createdBy?: string, page: number, resPerPage: number }) {
    return this.currencyConversionsService.findAll(
      user,
      filters
    );
  }

}
