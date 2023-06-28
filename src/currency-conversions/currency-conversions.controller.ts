import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CurrencyConversionsService } from './currency-conversions.service';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { UpdateCurrencyConversionDto } from './dto/update-currency-conversion.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { query } from 'express';
import PaginationQueryType from 'src/types/paginationQuery';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('currency-conversions')
export class CurrencyConversionsController {
  constructor(private readonly currencyConversionsService: CurrencyConversionsService) { }


  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createCurrencyConversionDto: CreateCurrencyConversionDto, @CurrentUser() user: JwtPayload) {
    return this.currencyConversionsService.create(createCurrencyConversionDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryType, @Query() filters: { trasactionType?: String; createdBy?: string }) {
    return this.currencyConversionsService.findAll(
      user,
      query,
      filters
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
  //   return this.currencyConversionsService.findOne(id, user); 
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCurrencyConversionDto: UpdateCurrencyConversionDto) {
  //   return this.currencyConversionsService.update(+id, updateCurrencyConversionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.currencyConversionsService.remove(+id);
  // }
}
