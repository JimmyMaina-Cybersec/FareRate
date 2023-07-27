import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLoaneeDto {


    @IsNotEmpty()
    @IsString()
    customerFirstName: string;

    @IsNotEmpty()
    @IsString()
    customerLastName: string;

    @IsNotEmpty()
    @IsString()
    customerIdNo: string;

    @IsNotEmpty()
    @IsString()
    customerPhone: string;

    @IsNotEmpty()
    @IsString()
    photoURL: string;

}
