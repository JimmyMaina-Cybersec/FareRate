import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { FloatService } from './float.service';
import { CreateFloatDto } from './dto/create-float.dto';
import { UpdateFloatDto } from './dto/update-float.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';

@UseGuards(JwtAuthGuard)
@Controller('float')
export class FloatController {
  constructor(private readonly floatService: FloatService) { }

  @Post()
  create(@Body() createFloatDto: CreateFloatDto, @CurrentUser() user: JwtPayload) {
    return this.floatService.create(createFloatDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryType, @Query() fliters: { status?: string, serviceAgent?: string }) {
    return this.floatService.findAll(user, query, fliters);
  }


  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFloatDto: UpdateFloatDto, @CurrentUser() user: JwtPayload) {
    return this.floatService.update(id, updateFloatDto, user);
  }

  @Patch('close/:serviceAgent')
  close(@Param('serviceAgent') id: string, @CurrentUser() user: JwtPayload) {
    return this.floatService.closeFloat(id, user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.floatService.remove(id, user);
  }
}
