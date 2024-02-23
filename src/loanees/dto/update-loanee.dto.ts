import { PartialType } from '@nestjs/mapped-types';
import { CreateLoaneeDto } from './create-loanee.dto';

export class UpdateLoaneeDto extends PartialType(CreateLoaneeDto) {}
