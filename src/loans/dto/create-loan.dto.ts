import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsString()
  customerIdNo: string;
  
  @IsNotEmpty()
  @IsNumber()
  loanAmount: number;
  // totalLoan: number;

  // @IsNotEmpty()
  // @IsString()
  // customerName: string;


  // @IsNotEmpty()
  // @IsString()
  // customerPhone: string;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
