import { Test, TestingModule } from '@nestjs/testing';
import { MobileAndBankFloatService } from './mobile-and-bank-float.service';

describe('MobileAndBankFloatService', () => {
  let service: MobileAndBankFloatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobileAndBankFloatService],
    }).compile();

    service = module.get<MobileAndBankFloatService>(MobileAndBankFloatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
