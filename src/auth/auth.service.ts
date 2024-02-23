/* eslint-disable prettier/prettier */
import {ForbiddenException, HttpException, HttpStatus, Injectable,} from '@nestjs/common';
import {CreateAuthDto} from './dto/login.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from 'src/users/schema/user.schema';

import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {JwtPayload} from 'src/types/jwt-payload';
import AuthToken from 'src/types/authToken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.userModel.findOne({ idNo: createAuthDto.idNo });
      if (!user) {
        throw new ForbiddenException('User Does Not Exist');
      }

      // TODO: Temporary solution as bcrypt was removed due to incompatibility with azure functionsnest add @nestjs/azure-func-http
      if (createAuthDto.password != `${user.firstName}@${user.idNo}`) {
        throw new ForbiddenException('Invalid credentials');
      }
      await user.updateOne({ lastLogin: new Date() });

      return await this.signToken(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async signToken(user: UserDocument): Promise<AuthToken> {
    const payload: JwtPayload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      idNo: user.idNo,
      phone: user.phone,
      email: user.email,
      shop: user.shop,
      photoURL: user.photoURL,
      role: user.role,
    };

    console.log(user);
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret:
            'b49f49e998433edb4c73bdc6def2eb4984349ba46fb9f76010762b5af56455bc441e1f340b2b13973527a45da82aa882da1b4d9fa6a659ab2881f23cd1a4fece',
          expiresIn: '30d',
        }),
        this.jwtService.signAsync(payload, {
          secret:
            'b49f49e998433edb4c73bdc6def2eb4984349ba46fb9f76010762b5af56455bc441e1f340b2b13973527a45da82aa882da1b4d9fa6a659ab2881f23cd1a4fece',
          expiresIn: '30d',
        }),
      ]);

      // TODO: const hashedRefreshToken = await argon2.hash(refreshToken);

      await user.updateOne({ refreshToken: refreshToken });
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async refresh(refreshToken: string) {
    const user = await this.userModel.findOne({
      refreshToken: refreshToken,
    });
    if (!user) {
      throw new HttpException(
        'Invalid credentials or User doue not exist on Nganya',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.signToken(user);
  }

  async signOut(id: string) {
    this.userModel.findByIdAndUpdate(id, {
      refreshToken: null,
    });
  }
}
