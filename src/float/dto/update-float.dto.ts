import { PartialType } from '@nestjs/mapped-types';
import { CreateFloatDto } from './create-float.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateFloatDto extends PartialType(CreateFloatDto) {


    @IsNumber()
    readonly addedAmount: number

    @IsString()
    readonly updatedBy: string

}
