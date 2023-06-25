import { Injectable } from '@nestjs/common';
import { CreateFloatDto } from './dto/create-float.dto';
import { UpdateFloatDto } from './dto/update-float.dto';

@Injectable()
export class FloatService {
  create(createFloatDto: CreateFloatDto) {
    return 'This action adds a new float';
  }

  findAll() {
    return `This action returns all float`;
  }

  findOne(id: number) {
    return `This action returns a #${id} float`;
  }

  update(id: number, updateFloatDto: UpdateFloatDto) {
    return `This action updates a #${id} float`;
  }

  remove(id: number) {
    return `This action removes a #${id} float`;
  }
}
