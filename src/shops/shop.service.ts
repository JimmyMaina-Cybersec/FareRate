/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from './schema/shop.schma';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';

@Injectable()
export class ShopService {

  constructor(
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) { }

  create(createShopDto: CreateShopDto, user: JwtPayload) {
    if (user.role === 'admin' || user.role === 'super user') {
      const shop = new this.shopModel({ ...createShopDto, createdBy: user._id, photoURL: `https://api.dicebear.com/6.x/shapes/svg?seed=${createShopDto.name}` });
      return shop.save();

    }
    throw new UnauthorizedException('You are not authorized to perform this action');
  }

  async findAll(user: JwtPayload, query: PaginationQueryType): Promise<{
    data: ShopDocument[];
    page: number,
    resPerPage: number,
    numberOfPages: number
  }> {

    const currentPage = query.page ?? 1;
    const resPerPage = query.resPerPage ?? 20;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role == 'admin' || user.role == 'super user') {

      const numberOfShops = await this.shopModel.countDocuments();
      if (numberOfShops <= 0) {
        throw new HttpException('No shops found', HttpStatus.NOT_FOUND);
      }

      const numberOfPages = Math.ceil(numberOfShops / resPerPage);

      const shops: ShopDocument[] = await this.shopModel.find(
      ).select('-__v').limit(resPerPage).skip(skip).exec()
      return {
        data: shops,
        page: currentPage,
        resPerPage: resPerPage,
        numberOfPages: numberOfPages
      }
    }
    throw new UnauthorizedException('You are not authorized to perform this action');


  }

  findOne(id: string, user: JwtPayload) {
    if (user.role === 'admin' || user.role === 'super user') {
      return this.shopModel.findById(id);
    }
  }

  update(id: string, updateShopDto: UpdateShopDto, user: JwtPayload): Promise<ShopDocument> {
    if (user.role === 'admin' || user.role === 'super user') {
      return this.shopModel.findByIdAndUpdate(id, updateShopDto);
    }
    throw new UnauthorizedException('You are not authorized to update a shop');
  }

  remove(id: string, user: JwtPayload) {
    if (user.role === 'admin' || user.role === 'super user') {
      return this.shopModel.findByIdAndDelete(id);
    }
    throw new UnauthorizedException('You are not authorized to delete a shop');
  }
}
