import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRateController } from './transaction-rate.controller';
import { TransactionRateService } from './transaction-rate.service';

describe('TransactionRateController', () => {
  let controller: TransactionRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionRateController],
      providers: [TransactionRateService],
    }).compile();

    controller = module.get<TransactionRateController>(TransactionRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
