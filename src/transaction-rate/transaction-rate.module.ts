import { Module } from '@nestjs/common';
import { TransactionRateService } from './transaction-rate.service';
import { TransactionRateController } from './transaction-rate.controller';

@Module({
  controllers: [TransactionRateController],
  providers: [TransactionRateService]
})
export class TransactionRateModule {}
