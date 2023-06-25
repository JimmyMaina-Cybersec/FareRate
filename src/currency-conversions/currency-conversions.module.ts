import { Module } from '@nestjs/common';
import { CurrencyConversionsService } from './currency-conversions.service';
import { CurrencyConversionsController } from './currency-conversions.controller';

@Module({
  controllers: [CurrencyConversionsController],
  providers: [CurrencyConversionsService]
})
export class CurrencyConversionsModule {}
