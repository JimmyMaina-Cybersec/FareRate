import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LoaneesService } from './loanees.service';
import { CreateLoaneeDto } from './dto/create-loanee.dto';
import { UpdateLoaneeDto } from './dto/update-loanee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';


@UseGuards(JwtAuthGuard)
@Controller('loanees')
export class LoaneesController {
  constructor(private readonly loaneesService: LoaneesService) { }

  @Post('create')
  create(@Body() createLoaneeDto: CreateLoaneeDto, @CurrentUser() user: JwtPayload) {
    return this.loaneesService.create(createLoaneeDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() pagination: PaginationQueryType) {
    return this.loaneesService.findAll(pagination, user);
  }

  @Get('loanee/:id')
  findOne(@Param('id') id: string) {
    return this.loaneesService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLoaneeDto: UpdateLoaneeDto) {
    return this.loaneesService.update(id, updateLoaneeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.loaneesService.remove(id, user);
  }
}
