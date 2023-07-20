import { Module } from '@nestjs/common';
import { MobileMoneyService } from './mobile-money.service';
import { MobileMoneyController } from './mobile-money.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileMoney } from './entities/mobile-money.entity';

@Module({
  controllers: [MobileMoneyController],
  providers: [MobileMoneyService],
  imports: [
    MongooseModule.forFeature([
      { name: MobileMoney.name, schema: MobileMoney },
    ]),
  ]
})
export class MobileMoneyModule { }
