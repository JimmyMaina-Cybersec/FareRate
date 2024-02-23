import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MobileMoneyProvidersService } from './mobile-money-providers.service';
import { CreateMobileMoneyProviderDto } from './dto/create-mobile-money-provider.dto';
import { UpdateMobileMoneyProviderDto } from './dto/update-mobile-money-provider.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';


@UseGuards(JwtAuthGuard)
@Controller('mobile-money-providers')
export class MobileMoneyProvidersController {
  constructor(private readonly mobileMoneyProvidersService: MobileMoneyProvidersService) { }

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
    return this.mobileMoneyProvidersService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMobileMoneyProviderDto: UpdateMobileMoneyProviderDto, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyProvidersService.update(id, updateMobileMoneyProviderDto, user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyProvidersService.remove(id, user);
  }
}
