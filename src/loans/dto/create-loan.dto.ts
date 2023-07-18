import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLoanDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    idNo: string;
    
    @IsNotEmpty()
    @IsString()
    phoneNo: string;
  }
  