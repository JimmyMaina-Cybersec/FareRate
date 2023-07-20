import { Injectable } from '@nestjs/common';
import { CreateMobileMoneyProviderDto } from './dto/create-mobile-money-provider.dto';
import { UpdateMobileMoneyProviderDto } from './dto/update-mobile-money-provider.dto';

@Injectable()
export class MobileMoneyProvidersService {
  create(createMobileMoneyProviderDto: CreateMobileMoneyProviderDto) {
    return 'This action adds a new mobileMoneyProvider';
  }

  findAll() {
    return `This action returns all mobileMoneyProviders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobileMoneyProvider`;
  }

  update(id: number, updateMobileMoneyProviderDto: UpdateMobileMoneyProviderDto) {
    return `This action updates a #${id} mobileMoneyProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobileMoneyProvider`;
  }
}
