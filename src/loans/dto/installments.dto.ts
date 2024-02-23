/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInstallmentDto {
  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;
}
