import { Module } from '@nestjs/common';
import { MobileMoneyProvidersService } from './mobile-money-providers.service';
import { MobileMoneyProvidersController } from './mobile-money-providers.controller';

@Module({
  controllers: [MobileMoneyProvidersController],
  providers: [MobileMoneyProvidersService]
})
export class MobileMoneyProvidersModule {}
