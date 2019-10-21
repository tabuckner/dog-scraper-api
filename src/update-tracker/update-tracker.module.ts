import { Module } from '@nestjs/common';
import { UpdateTrackerService } from './update-tracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateTrackerSchema } from '../schemas/update-tracker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UpdateTracker', schema: UpdateTrackerSchema },
    ]),
  ],
  providers: [UpdateTrackerService],
  exports: [UpdateTrackerService],
})
export class UpdateTrackerModule { }
