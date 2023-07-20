import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobileMoneyProvidersService } from './mobile-money-providers.service';
import { CreateMobileMoneyProviderDto } from './dto/create-mobile-money-provider.dto';
import { UpdateMobileMoneyProviderDto } from './dto/update-mobile-money-provider.dto';

@Controller('mobile-money-providers')
export class MobileMoneyProvidersController {
  constructor(private readonly mobileMoneyProvidersService: MobileMoneyProvidersService) {}

  @Post()
  create(@Body() createMobileMoneyProviderDto: CreateMobileMoneyProviderDto) {
    return this.mobileMoneyProvidersService.create(createMobileMoneyProviderDto);
  }

  @Get()
  findAll() {
    return this.mobileMoneyProvidersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobileMoneyProvidersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobileMoneyProviderDto: UpdateMobileMoneyProviderDto) {
    return this.mobileMoneyProvidersService.update(+id, updateMobileMoneyProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileMoneyProvidersService.remove(+id);
  }
}
