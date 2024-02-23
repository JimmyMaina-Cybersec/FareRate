import { Test, TestingModule } from '@nestjs/testing';
import { MobileMoneyProvidersService } from './mobile-money-providers.service';

describe('MobileMoneyProvidersService', () => {
  let service: MobileMoneyProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobileMoneyProvidersService],
    }).compile();

    service = module.get<MobileMoneyProvidersService>(MobileMoneyProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
