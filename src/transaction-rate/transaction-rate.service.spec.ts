import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRateService } from './transaction-rate.service';

describe('TransactionRateService', () => {
  let service: TransactionRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionRateService],
    }).compile();

    service = module.get<TransactionRateService>(TransactionRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
