/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  name: string;

  @IsString()
  town: string;

  @IsString()
  country: string;
}
