import { Test, TestingModule } from '@nestjs/testing';
import { LoaneesController } from './loanees.controller';
import { LoaneesService } from './loanees.service';

describe('LoaneesController', () => {
  let controller: LoaneesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoaneesController],
      providers: [LoaneesService],
    }).compile();

    controller = module.get<LoaneesController>(LoaneesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
