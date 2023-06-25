import { Injectable } from '@nestjs/common';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { UpdateCurrencyConversionDto } from './dto/update-currency-conversion.dto';

@Injectable()
export class CurrencyConversionsService {
  create(createCurrencyConversionDto: CreateCurrencyConversionDto) {
    return 'This action adds a new currencyConversion';
  }

  findAll() {
    return `This action returns all currencyConversions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currencyConversion`;
  }

  update(id: number, updateCurrencyConversionDto: UpdateCurrencyConversionDto) {
    return `This action updates a #${id} currencyConversion`;
  }

  remove(id: number) {
    return `This action removes a #${id} currencyConversion`;
  }
}
