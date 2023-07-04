import { Injectable } from '@nestjs/common';
import { CreateMobileAndBankFloatDto } from './dto/create-mobile-and-bank-float.dto';
import { UpdateMobileAndBankFloatDto } from './dto/update-mobile-and-bank-float.dto';

@Injectable()
export class MobileAndBankFloatService {
  create(createMobileAndBankFloatDto: CreateMobileAndBankFloatDto) {
    return 'This action adds a new mobileAndBankFloat';
  }

  findAll() {
    return `This action returns all mobileAndBankFloat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobileAndBankFloat`;
  }

  update(id: number, updateMobileAndBankFloatDto: UpdateMobileAndBankFloatDto) {
    return `This action updates a #${id} mobileAndBankFloat`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobileAndBankFloat`;
  }
}
