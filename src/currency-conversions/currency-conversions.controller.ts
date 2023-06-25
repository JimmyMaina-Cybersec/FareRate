import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrencyConversionsService } from './currency-conversions.service';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { UpdateCurrencyConversionDto } from './dto/update-currency-conversion.dto';

@Controller('currency-conversions')
export class CurrencyConversionsController {
  constructor(private readonly currencyConversionsService: CurrencyConversionsService) {}

  @Post()
  create(@Body() createCurrencyConversionDto: CreateCurrencyConversionDto) {
    return this.currencyConversionsService.create(createCurrencyConversionDto);
  }

  @Get()
  findAll() {
    return this.currencyConversionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyConversionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyConversionDto: UpdateCurrencyConversionDto) {
    return this.currencyConversionsService.update(+id, updateCurrencyConversionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyConversionsService.remove(+id);
  }
}
