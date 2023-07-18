/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  signOut(@CurrentUser('_id') userId: string) {
    return this.authService.signOut(userId);
  }

  // @Post('local/signIn')
  // signInLocal(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.login(createAuthDto);

  // }

  // @Post('local/signOutLocal')
  // signOutLocal(@CurrentUser('_id') userId: string) {
  //   return this.authService.signOut(userId);
  // }

  // @Post('local/refresh')
  // refreshLocal() { }

}
