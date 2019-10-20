import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleServiceService } from './schedule-service.service';

describe('ScheduleServiceService', () => {
  let service: ScheduleServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleServiceService],
    }).compile();

    service = module.get<ScheduleServiceService>(ScheduleServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
