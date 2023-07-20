import { Injectable } from '@nestjs/common';
import { CreateMobileMoneyDto } from './dto/create-mobile-money.dto';
import { UpdateMobileMoneyDto } from './dto/update-mobile-money.dto';

@Injectable()
export class MobileMoneyService {
  create(createMobileMoneyDto: CreateMobileMoneyDto) {
    return 'This action adds a new mobileMoney';
  }

  findAll() {
    return `This action returns all mobileMoney`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobileMoney`;
  }

  update(id: number, updateMobileMoneyDto: UpdateMobileMoneyDto) {
    return `This action updates a #${id} mobileMoney`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobileMoney`;
  }
}
