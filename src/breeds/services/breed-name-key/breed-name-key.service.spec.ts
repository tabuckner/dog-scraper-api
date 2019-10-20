import { Test, TestingModule } from '@nestjs/testing';
import { BreedNameKeyService } from './breed-name-key.service';

describe('BreedNameKeyService', () => {
  let service: BreedNameKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedNameKeyService],
    }).compile();

    service = module.get<BreedNameKeyService>(BreedNameKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
