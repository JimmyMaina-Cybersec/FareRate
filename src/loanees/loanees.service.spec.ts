import { Test, TestingModule } from '@nestjs/testing';
import { LoaneesService } from './loanees.service';

describe('LoaneesService', () => {
  let service: LoaneesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoaneesService],
    }).compile();

    service = module.get<LoaneesService>(LoaneesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
