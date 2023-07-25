import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  loanAmount: number;

  @IsNotEmpty()
  @IsString()
  customerIdNo: string;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
