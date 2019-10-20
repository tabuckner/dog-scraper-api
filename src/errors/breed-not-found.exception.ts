import { NotFoundException } from '@nestjs/common';

export class BreedNotFoundException extends NotFoundException {
  constructor(searchObj: object) {
    super(`Could not find Breed with reqeusted info: ${JSON.stringify(searchObj)}`);
  }
}
