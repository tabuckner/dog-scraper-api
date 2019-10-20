import { Document } from "mongoose";

export interface ICat extends Document {
  name: string;
  age: number;
  breed: string;
}
