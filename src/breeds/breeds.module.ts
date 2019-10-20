import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreedsController } from './breeds.controller';
import { BreedsService } from './breeds.service';
import { BreedSchema } from '../schemas/breed.schema';
import { BreedNameKeyService } from './breed-name-key/breed-name-key.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Breed', schema: BreedSchema },
    ]),
  ],
  controllers: [
    BreedsController,
  ],
  providers: [BreedsService, BreedNameKeyService],
})
export class BreedsModule { }
