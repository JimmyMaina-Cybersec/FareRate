import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobileMoneyService } from './mobile-money.service';
import { CreateMobileMoneyDto } from './dto/create-mobile-money.dto';
import { UpdateMobileMoneyDto } from './dto/update-mobile-money.dto';

@Controller('mobile-money')
export class MobileMoneyController {
  constructor(private readonly mobileMoneyService: MobileMoneyService) {}

  @Post()
  create(@Body() createMobileMoneyDto: CreateMobileMoneyDto) {
    return this.mobileMoneyService.create(createMobileMoneyDto);
  }

  @Get()
  findAll() {
    return this.mobileMoneyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobileMoneyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobileMoneyDto: UpdateMobileMoneyDto) {
    return this.mobileMoneyService.update(+id, updateMobileMoneyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileMoneyService.remove(+id);
  }
}
