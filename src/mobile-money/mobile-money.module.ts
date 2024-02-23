import { Module } from '@nestjs/common';
import { MobileMoneyService } from './mobile-money.service';
import { MobileMoneyController } from './mobile-money.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileMoney, MobileMoneySchema } from './entities/mobile-money.entity';

@Module({
  controllers: [MobileMoneyController],
  providers: [MobileMoneyService],
  imports: [
    MongooseModule.forFeature([
      { name: MobileMoney.name, schema: MobileMoneySchema },
    ]),
  ]
})
export class MobileMoneyModule { }
