import { Test, TestingModule } from '@nestjs/testing';
import { MobileMoneyProvidersController } from './mobile-money-providers.controller';
import { MobileMoneyProvidersService } from './mobile-money-providers.service';

describe('MobileMoneyProvidersController', () => {
  let controller: MobileMoneyProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileMoneyProvidersController],
      providers: [MobileMoneyProvidersService],
    }).compile();

    controller = module.get<MobileMoneyProvidersController>(MobileMoneyProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
