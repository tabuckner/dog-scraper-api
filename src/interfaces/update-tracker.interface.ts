import { Document } from 'mongoose';

export interface IUpdateTracker {
  timestamp: string;
  projectId: number | string;
}

export interface UpdateTrackerEntity extends IUpdateTracker, Document {}
