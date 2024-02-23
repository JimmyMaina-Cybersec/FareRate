import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'b49f49e998433edb4c73bdc6def2eb4984349ba46fb9f76010762b5af56455bc441e1f340b2b13973527a45da82aa882da1b4d9fa6a659ab2881f23cd1a4fece',
    });
  }

  validate(payload: any) {
    return payload;
  }
}
