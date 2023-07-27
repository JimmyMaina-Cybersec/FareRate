import { PartialType } from '@nestjs/mapped-types';
import { CreateShopDto } from './create-shop.dto';
import { IsNumber } from 'class-validator';

export class UpdateShopDto extends PartialType(CreateShopDto) {
  @IsNumber()
  loanMoney: number;
}
