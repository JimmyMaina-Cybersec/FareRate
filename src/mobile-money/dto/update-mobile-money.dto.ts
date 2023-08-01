import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileMoneyDto } from './create-mobile-money.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMobileMoneyDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
