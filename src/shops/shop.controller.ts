import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';


@UseGuards(JwtAuthGuard)
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post()
  create(@Body() createShopDto: CreateShopDto, @CurrentUser() user: JwtPayload) {
    return this.shopService.create(createShopDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryType) {
    return this.shopService.findAll(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.shopService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto, @CurrentUser() user: JwtPayload) {
    return this.shopService.update(id, updateShopDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {

    return this.shopService.remove(id, user);
  }
}
