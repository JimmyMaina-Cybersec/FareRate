import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileMoneyProviderDto } from './create-mobile-money-provider.dto';

export class UpdateMobileMoneyProviderDto extends PartialType(CreateMobileMoneyProviderDto) {}
