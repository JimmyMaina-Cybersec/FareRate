import { Module } from '@nestjs/common';
import { MobileMoneyService } from './mobile-money.service';
import { MobileMoneyController } from './mobile-money.controller';

@Module({
  controllers: [MobileMoneyController],
  providers: [MobileMoneyService]
})
export class MobileMoneyModule {}
