import { Document } from 'mongoose';
import { IBreedAttribute } from './breed-attribute.interface';

export interface IBreed {
  displayName: string;
  attributes: IBreedAttribute[];
}

export interface IBreedWithKey extends IBreed {
  breedNameKey: string;
}

export interface BreedEntity extends IBreedWithKey, Document {}
