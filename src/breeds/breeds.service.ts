import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICat } from 'src/interfaces/cat.interface';
import { CreateCatDto } from 'src/dto/create-cat.dto';

@Injectable()
export class BreedsService {
  constructor(@InjectModel('Cat') private catModel: Model<ICat>) {}

  async create(createCatDto: CreateCatDto): Promise<ICat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }
}
