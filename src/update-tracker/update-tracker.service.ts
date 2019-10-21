import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTrackerEntity, IUpdateTracker } from '../interfaces/update-tracker.interface';
import { UpdateTrackerDto } from '../dto/update-tracker.dto';

const UPDATE_TRACKER_ID = 1;

@Injectable()
export class UpdateTrackerService {
  constructor(@InjectModel('UpdateTracker') private updateTrackerModel: Model<UpdateTrackerEntity>) { }

  async shouldUpdateData(): Promise<boolean> {
    const updateTracker = await this.get();
    const now = new Date();
    const updateThreshold = this.addDays(now, 7);
    const lastUpdated = new Date(updateTracker.timestamp);
    return lastUpdated > updateThreshold;
  }

  async get(): Promise<UpdateTrackerEntity> {
    return this.updateTrackerModel.findOne({ projectId: UPDATE_TRACKER_ID });
  }

  async updateOrCreate(date: Date): Promise<UpdateTrackerEntity> {
    const updateTracker = await this.updateTrackerModel.find({ projectId: UPDATE_TRACKER_ID });
    if (!updateTracker || updateTracker.length < 1) {
      return this.updateTrackerModel.create({ projectId: UPDATE_TRACKER_ID }, this.createDto(date));
    }
    return this.updateTrackerModel.updateOne({ projectId: UPDATE_TRACKER_ID }, this.createDto(date));
  }

  private createDto(date: Date): UpdateTrackerDto {
    return {
      projectId: UPDATE_TRACKER_ID,
      timestamp: date.toISOString(),
    };
  }

  private addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

}
