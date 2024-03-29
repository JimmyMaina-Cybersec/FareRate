import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';

import PaginationQueryType from 'src/types/paginationQuery';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  profile(user: JwtPayload) {
    return this.userModel
      .findById(user._id)
      .populate('shop')
      .select('-refreshToken -__v')
      .exec();
  }

  create(createUserDto: CreateUserDto, user: JwtPayload) {
    try {
      if (user.role == 'super user' || user.role == 'admin') {
        return new this.userModel({
          ...createUserDto,
          createdBy: user._id,
          photoURL: `https://api.dicebear.com/6.x/thumbs/svg?seed=${createUserDto.idNo}`,
        }).save();
      }

      return new HttpException(
        'You are not authorized to perform this action',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    user: JwtPayload,
    query: PaginationQueryType,
    filter: { shop?: string },
  ): Promise<{
    data: UserDocument[];
    page: number;
    resPerPage: number;
    numberOfPages: number;
  }> {
    const currentPage = query.page ?? 1;
    const resPerPage = query.resPerPage ?? 20;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role == 'admin' || user.role == 'super user') {
      const numberOfUsers = await this.userModel.countDocuments({
        ...filter,
      });
      if (numberOfUsers <= 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      const numberOfPages = Math.ceil(numberOfUsers / resPerPage);

      const users: UserDocument[] = await this.userModel
        .find({
          ...filter,
        })
        .select('-refreshToken -__v')
        .sort({ firstName: -1 })
        .limit(resPerPage)
        .skip(skip)
        .exec();
      return {
        data: users,
        page: query.page,
        resPerPage: resPerPage ?? 20,
        numberOfPages: numberOfPages,
      };
    }
    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  findOne(id: string, user: JwtPayload): Promise<UserDocument> {
    if (user.role == 'admin' || user.role == 'super user') {
      return this.userModel.findById(id).select('-refreshToken -__v').exec();
    }

    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
  }

  update(
    id: string,
    updateUserDto: UpdateUserDto,
    user: JwtPayload,
  ): Promise<UserDocument> {
    if (user.role == 'admin' || user.role == 'super user') {
      return this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .select('-refreshToken -__v')
        .exec();
    }

    throw new UnauthorizedException('You are not authorized to Update a user');
  }

  remove(id: string, user: JwtPayload) {
    if (user.role == 'admin' || user.role == 'super user') {
      return this.userModel.findByIdAndDelete(id).exec();
    }
    throw new UnauthorizedException('You are not authorized to delete a user');
  }
}
