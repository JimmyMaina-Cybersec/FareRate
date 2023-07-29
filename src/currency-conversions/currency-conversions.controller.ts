import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrencyConversionsService } from './currency-conversions.service';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import PaginationQueryType from '../types/paginationQuery';

@UseGuards(JwtAuthGuard)
@Controller('currency-conversions')
export class CurrencyConversionsController {
  constructor(
    private readonly currencyConversionsService: CurrencyConversionsService,
  ) {}

  @Post('create')
  create(
    @Body() createCurrencyConversionDto: CreateCurrencyConversionDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.currencyConversionsService.create(
      createCurrencyConversionDto,
      user,
    );
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query()
    filters: {
      trasactionType?: string;
      createdBy?: string;
    },
    @Query() pagination: PaginationQueryType,
  ) {
    return this.currencyConversionsService.findAll(user, filters, pagination);
  }
}
