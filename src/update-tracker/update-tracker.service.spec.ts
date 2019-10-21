import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTrackerService } from './update-tracker.service';

describe('UpdateTrackerService', () => {
  let service: UpdateTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTrackerService],
    }).compile();

    service = module.get<UpdateTrackerService>(UpdateTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
