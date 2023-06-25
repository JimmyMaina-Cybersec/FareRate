import { Module } from '@nestjs/common';
import { FloatService } from './float.service';
import { FloatController } from './float.controller';

@Module({
  controllers: [FloatController],
  providers: [FloatService]
})
export class FloatModule {}
