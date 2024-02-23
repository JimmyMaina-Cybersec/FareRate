import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMobileMoneyDto {
    @IsNotEmpty()
    @IsNumber()
    assignedAmount: number;

    @IsNotEmpty()
    @IsString()
    agent: string;

    @IsNotEmpty()
    @IsString()
    shop: string;

    @IsNotEmpty()
    @IsString()
    provider: string;
}
