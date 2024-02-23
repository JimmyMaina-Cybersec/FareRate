import { Module } from '@nestjs/common';
import { MobileAndBankFloatService } from './mobile-and-bank-float.service';
import { MobileAndBankFloatController } from './mobile-and-bank-float.controller';

@Module({
  controllers: [MobileAndBankFloatController],
  providers: [MobileAndBankFloatService]
})
export class MobileAndBankFloatModule {}
