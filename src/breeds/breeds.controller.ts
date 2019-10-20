import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { IBreedWithKey } from '../interfaces/breed.interface';
import { CreateBreedDto } from '../dto/create-breed.dto';
import { BreedsService } from './services/breeds/breeds.service';
import { BreedNameKeyService } from './services/breed-name-key/breed-name-key.service';

@Controller('breeds')
export class BreedsController {

  constructor(private breedsService: BreedsService,
              private nameKeyService: BreedNameKeyService) { }

  @Get()
  findAll(): Promise<IBreedWithKey[]> {
    return this.breedsService.findAll();
  }

  @Post()
  async addBreed(@Body() createBreedDto: CreateBreedDto) {
    const newBreedWithKey = this.nameKeyService.addNameKey(createBreedDto);
    console.warn(newBreedWithKey);
    this.breedsService.create(newBreedWithKey);
  }

  @Get(':breedNameKey')
  async getBreed(@Param('breedNameKey') breedNameKey: string): Promise<IBreedWithKey> {
    return this.breedsService.findOne(breedNameKey);
  }

  @Patch(':breedNameKey')
  async updateBreed(@Param('breedNameKey') breedNameKey: string, @Body() partialBreedDto: Partial<CreateBreedDto>) {
    await this.breedsService.update(breedNameKey, partialBreedDto);
  } 

  @Delete(':breedNameKey')
  async deleteBreed(@Param('breedNameKey') breedNameKey: string) {
    await this.breedsService.delete(breedNameKey);
  }

}
