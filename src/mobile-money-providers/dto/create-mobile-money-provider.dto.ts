import { IsNotEmpty, IsString } from "class-validator";

export class CreateMobileMoneyProviderDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    currency: string;
}
