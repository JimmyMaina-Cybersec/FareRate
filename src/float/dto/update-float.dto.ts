import { PartialType } from '@nestjs/mapped-types';
import { CreateFloatDto } from './create-float.dto';
import { IsString } from 'class-validator';

export class UpdateFloatDto extends PartialType(CreateFloatDto) {


    @IsString()
    readonly addedAmount: number

    @IsString()
    readonly updatedBy: string

}
