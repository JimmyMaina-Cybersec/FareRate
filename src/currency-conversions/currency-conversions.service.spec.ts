import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConversionsService } from './currency-conversions.service';

describe('CurrencyConversionsService', () => {
  let service: CurrencyConversionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyConversionsService],
    }).compile();

    service = module.get<CurrencyConversionsService>(CurrencyConversionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
