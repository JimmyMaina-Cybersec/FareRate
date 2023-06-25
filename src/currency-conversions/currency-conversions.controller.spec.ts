import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConversionsController } from './currency-conversions.controller';
import { CurrencyConversionsService } from './currency-conversions.service';

describe('CurrencyConversionsController', () => {
  let controller: CurrencyConversionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyConversionsController],
      providers: [CurrencyConversionsService],
    }).compile();

    controller = module.get<CurrencyConversionsController>(CurrencyConversionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
