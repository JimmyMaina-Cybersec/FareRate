import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileMoneyDto } from './create-mobile-money.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewDTO {
    @IsBoolean()
    @IsNotEmpty()
    approve: boolean;
}
