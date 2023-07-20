import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMobileMoneyProviderDto } from './dto/create-mobile-money-provider.dto';
import { UpdateMobileMoneyProviderDto } from './dto/update-mobile-money-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobileMoneyProvider } from './entities/mobile-money-provider.entity';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class MobileMoneyProvidersService {
  constructor(
    @InjectModel(MobileMoneyProvider.name)
    private mobileMoneyProviderModel: Model<MobileMoneyProvider>,
  ) { }

  create(createMobileMoneyProviderDto: CreateMobileMoneyProviderDto) {
    try {
      return this.mobileMoneyProviderModel.create(createMobileMoneyProviderDto);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.mobileMoneyProviderModel.find();
  }

  findOne(id: string) {
    return this.mobileMoneyProviderModel.findById(id);
  }

  async update(id: string, updateMobileMoneyProviderDto: UpdateMobileMoneyProviderDto, user: JwtPayload) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update mobile money providers');
    }
    return await this.mobileMoneyProviderModel.findByIdAndUpdate(id, updateMobileMoneyProviderDto, { new: true });
  }

  remove(id: string, user: JwtPayload) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can delete mobile money providers');
    }
    return this.mobileMoneyProviderModel.findByIdAndDelete(id);
  }
}
