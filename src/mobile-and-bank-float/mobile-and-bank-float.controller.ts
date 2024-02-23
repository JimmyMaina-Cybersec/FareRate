import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobileAndBankFloatService } from './mobile-and-bank-float.service';
import { CreateMobileAndBankFloatDto } from './dto/create-mobile-and-bank-float.dto';
import { UpdateMobileAndBankFloatDto } from './dto/update-mobile-and-bank-float.dto';

@Controller('mobile-and-bank-float')
export class MobileAndBankFloatController {
  constructor(private readonly mobileAndBankFloatService: MobileAndBankFloatService) {}

  @Post()
  create(@Body() createMobileAndBankFloatDto: CreateMobileAndBankFloatDto) {
    return this.mobileAndBankFloatService.create(createMobileAndBankFloatDto);
  }

  @Get()
  findAll() {
    return this.mobileAndBankFloatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobileAndBankFloatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobileAndBankFloatDto: UpdateMobileAndBankFloatDto) {
    return this.mobileAndBankFloatService.update(+id, updateMobileAndBankFloatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileAndBankFloatService.remove(+id);
  }
}
