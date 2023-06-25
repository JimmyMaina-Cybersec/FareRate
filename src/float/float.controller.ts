import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FloatService } from './float.service';
import { CreateFloatDto } from './dto/create-float.dto';
import { UpdateFloatDto } from './dto/update-float.dto';

@Controller('float')
export class FloatController {
  constructor(private readonly floatService: FloatService) {}

  @Post()
  create(@Body() createFloatDto: CreateFloatDto) {
    return this.floatService.create(createFloatDto);
  }

  @Get()
  findAll() {
    return this.floatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFloatDto: UpdateFloatDto) {
    return this.floatService.update(+id, updateFloatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floatService.remove(+id);
  }
}
