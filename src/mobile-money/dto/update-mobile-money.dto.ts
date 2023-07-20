import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileMoneyDto } from './create-mobile-money.dto';

export class UpdateMobileMoneyDto extends PartialType(CreateMobileMoneyDto) {}
