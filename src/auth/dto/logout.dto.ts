import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './login.dto';
import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  readonly refresh_token: string;
}
