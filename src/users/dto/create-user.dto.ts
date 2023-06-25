import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @IsNotEmpty()
    @IsString()
    readonly idNo: string;

    @IsEmail()
    readonly email: string;

    // @IsEmpty()
    // @IsString()
    // readonly photoURL: string;

    @IsNotEmpty()
    @IsString()
    readonly role: 'admin' | 'service agent' | 'accountant';
}
