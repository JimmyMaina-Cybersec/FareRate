import {
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateAuthDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly idNo: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
