import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';


@UseGuards(JwtAuthGuard)
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post('create')
  create(@Body() createShopDto: CreateShopDto, @CurrentUser() user: JwtPayload) {
    try {
      return this.shopService.create(createShopDto, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryType) {
    return this.shopService.findAll(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.shopService.findOne(id, user);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto, @CurrentUser() user: JwtPayload) {
    return this.shopService.update(id, updateShopDto, user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {

    return this.shopService.remove(id, user);
  }
}
