import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoaneeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  secondName: string;

  @IsNotEmpty()
  @IsString()
  idNo: string;

  @IsNotEmpty()
  @IsDate()
  DOB: Date;

  @IsNotEmpty()
  @IsString()
  photoURL: string;

  @IsNotEmpty()
  @IsString()
  idURL: string;
}
