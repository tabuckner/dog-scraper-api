import * as mongoose from 'mongoose';

export const UpdateTrackerSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  timestamp: { type: String, required: true },
});
