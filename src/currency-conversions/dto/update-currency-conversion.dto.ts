import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrencyConversionDto } from './create-currency-conversion.dto';

export class UpdateCurrencyConversionDto extends PartialType(CreateCurrencyConversionDto) {}
