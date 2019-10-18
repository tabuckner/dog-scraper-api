import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import { BreedsService } from './breeds.service';

@Controller('breeds')
export class BreedsController {

  constructor(private breedsService: BreedsService) {}

  @Get()
  async fakeCreate() {
    const catToCreate: CreateCatDto = {
      name: 'Fluffy',
      breed: 'Pooch',
      age: 12,
    };
    console.warn(catToCreate);
    await this.breedsService.create(catToCreate);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    await this.breedsService.create(createCatDto);
  }
}
