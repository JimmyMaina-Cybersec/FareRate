/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreateShopDto {
  @IsString()
  name: string;

  @IsString()
  town: string;

  @IsString()
  country: string;

  @IsNumber()
  loanMoney: number;
}
