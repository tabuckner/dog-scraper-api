import * as mongoose from 'mongoose';

export const BreedSchema = new mongoose.Schema({
  breedNameKey: { type: String, required: true },
  displayName: { type: String, required: true },
  attributes: {
    type: [{
      attribute: { type: String, required: true },
      description: { type: String, required: true },
      descriptionList: [String],
    }],
    required: true,
  },
});
