import { PartialType } from '@nestjs/mapped-types';
import { CreateFloatDto } from './create-float.dto';

export class UpdateFloatDto extends PartialType(CreateFloatDto) {}
