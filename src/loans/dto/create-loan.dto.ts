import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  totalLoan: number;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerIdNo: string;

  @IsNotEmpty()
  @IsString()
  customerPhone: string;
}
