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

>>>>>>> 19c273c9986911843316fe5e347a85c413da2710
  @IsNotEmpty()
  @IsString()
  currency: string;
}
