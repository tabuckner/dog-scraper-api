import { UnprocessableEntityException } from '@nestjs/common';
import { CreateBreedDto } from '../dto/create-breed.dto';

export class InvalidInboundBreedException extends UnprocessableEntityException {
  constructor(inboundBreed: CreateBreedDto) {
    super(`Inbound Breed is not valid: ${JSON.stringify(inboundBreed)}`);
  }
}
