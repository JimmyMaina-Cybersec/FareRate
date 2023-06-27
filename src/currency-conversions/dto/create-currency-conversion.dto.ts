import { IsNumber, IsString } from 'class-validator';

export class CreateCurrencyConversionDto {
  @IsString()
  initialCurrency: string;

  @IsString()
  finalCurrency: string;

  @IsNumber()
  initialAmount: number;

  @IsNumber()
  finalAmount: number;

  @IsNumber()
  rate: number;

  @IsString()
  transactionType: 'buy' | 'sell';

  @IsString()
  shop: string;

  // @IsString()
  // float: string;
}
