import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileAndBankFloatDto } from './create-mobile-and-bank-float.dto';

export class UpdateMobileAndBankFloatDto extends PartialType(CreateMobileAndBankFloatDto) {}
