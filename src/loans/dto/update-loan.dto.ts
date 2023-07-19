import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;
}
