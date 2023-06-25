import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionRateDto } from './create-transaction-rate.dto';

export class UpdateTransactionRateDto extends PartialType(CreateTransactionRateDto) {}
