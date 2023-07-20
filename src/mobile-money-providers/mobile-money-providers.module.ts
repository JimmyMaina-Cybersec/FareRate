import { Module } from '@nestjs/common';
import { MobileMoneyProvidersService } from './mobile-money-providers.service';
import { MobileMoneyProvidersController } from './mobile-money-providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileMoneyProvider } from './entities/mobile-money-provider.entity';

@Module({
  controllers: [MobileMoneyProvidersController],
  providers: [MobileMoneyProvidersService],
  imports: [
    MongooseModule.forFeature([
      { name: MobileMoneyProvider.name, schema: MobileMoneyProvider },
    ]),
  ],
})
export class MobileMoneyProvidersModule { }
