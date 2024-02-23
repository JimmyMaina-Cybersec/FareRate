import { Test, TestingModule } from '@nestjs/testing';
import { MobileAndBankFloatController } from './mobile-and-bank-float.controller';
import { MobileAndBankFloatService } from './mobile-and-bank-float.service';

describe('MobileAndBankFloatController', () => {
  let controller: MobileAndBankFloatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileAndBankFloatController],
      providers: [MobileAndBankFloatService],
    }).compile();

    controller = module.get<MobileAndBankFloatController>(MobileAndBankFloatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
