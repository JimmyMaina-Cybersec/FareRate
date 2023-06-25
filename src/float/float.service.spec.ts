import { Test, TestingModule } from '@nestjs/testing';
import { FloatService } from './float.service';

describe('FloatService', () => {
  let service: FloatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloatService],
    }).compile();

    service = module.get<FloatService>(FloatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
