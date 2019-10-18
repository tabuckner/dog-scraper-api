import { Test, TestingModule } from '@nestjs/testing';
import { BreedsController } from './breeds.controller';

describe('Breeds Controller', () => {
  let controller: BreedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedsController],
    }).compile();

    controller = module.get<BreedsController>(BreedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
