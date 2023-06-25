import { Module } from '@nestjs/common';
import { FloatService } from './float.service';
import { FloatController } from './float.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Float } from './entities/float.entity';
import { FloatSchema } from './schma/float.schema';

@Module({
  controllers: [FloatController],
  providers: [FloatService],
  imports: [
    MongooseModule.forFeature([
      { name: Float.name, schema: FloatSchema },
    ]),

  ],
})
export class FloatModule { }
