import { Test, TestingModule } from '@nestjs/testing';
import { FloatController } from './float.controller';
import { FloatService } from './float.service';

describe('FloatController', () => {
  let controller: FloatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloatController],
      providers: [FloatService],
    }).compile();

    controller = module.get<FloatController>(FloatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
