import { Module } from '@nestjs/common';
import { CurrencyConversionsService } from './currency-conversions.service';
import { CurrencyConversionsController } from './currency-conversions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyConversion } from './entities/currency-conversion.entity';
import { CurrencyConversionSchema } from './schema/currency-conversion.schema';
import { Float } from 'src/float/entities/float.entity';
import { FloatSchema } from 'src/float/schma/float.schema';

@Module({
  controllers: [CurrencyConversionsController],
  providers: [CurrencyConversionsService],
  imports: [
    MongooseModule.forFeature([
      { name: CurrencyConversion.name, schema: CurrencyConversionSchema },
      { name: Float.name, schema: FloatSchema }
    ]),

  ]
})
export class CurrencyConversionsModule { }
