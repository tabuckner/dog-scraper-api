import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BreedEntity, IBreedWithKey } from '../interfaces/breed.interface';
import { IBreedAttribute } from '../interfaces/breed-attribute.interface';
import { BreedNotFoundException } from '../errors/breed-not-found.exception';
import { CreateBreedDto } from '../dto/create-breed.dto';

@Injectable()
export class BreedsService {
  constructor(@InjectModel('Breed') private breedModel: Model<BreedEntity>) { }

  async create(breedDtoWithKey: IBreedWithKey): Promise<BreedEntity> {
    const createdBreed = new this.breedModel(breedDtoWithKey);
    return await createdBreed.save();
  }

  async findAll(): Promise<IBreedWithKey[]> {
    const results = await this.breedModel.find().exec();
    return results.map(this.mapBreedDocumentToDomainModel);
  }

  async findOne(breedNameKey: string): Promise<IBreedWithKey> {
    const breedEntity = await (this.findOneByProperty('breedNameKey', breedNameKey));
    return this.mapBreedDocumentToDomainModel(breedEntity);
  }

  async update(breedNameKey: string, partialBreedDto: Partial<CreateBreedDto>): Promise<IBreedWithKey> {
    const breedToUpdate = await this.findOneByProperty('breedNameKey', breedNameKey);
    return breedToUpdate.update(partialBreedDto);
  }

  async delete(breedNameKey: string) {
    const result = await this.breedModel.deleteOne({ breedNameKey });
    if (result.n === 0) {
      throw new BreedNotFoundException({ breedNameKey });
    }
  }


  private mapBreedDocumentToDomainModel(entity: BreedEntity): IBreedWithKey {
    return {
      breedNameKey: entity.breedNameKey,
      displayName: entity.displayName,
      attributes: entity.attributes.map((_attribute) => ({
        attribute: _attribute.attribute,
        description: _attribute.description,
        descriptionList: _attribute.descriptionList
      } as IBreedAttribute)),
    } as IBreedWithKey;
  }

  private async findOneByProperty(key: any, value: any): Promise<BreedEntity> {
    let breed;
    const searchObj = {};
    searchObj[key] = value;
    try {
      breed = await this.breedModel.findOne(searchObj).exec();
    } catch (error) {
      throw new BreedNotFoundException(searchObj);
    }
    if (!breed) {
      throw new BreedNotFoundException(searchObj);
    }
    return breed;
  }
}
