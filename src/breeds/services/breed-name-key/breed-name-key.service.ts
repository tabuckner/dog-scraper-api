import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from '../../../dto/create-breed.dto';
import { IBreedWithKey } from '../../../interfaces/breed.interface';
import { InvalidInboundBreedException } from '../../../errors/invalid-breed-dto.exception';

@Injectable()
export class BreedNameKeyService {
  /**
   * We want to decorate the inbound DTO with a unique, lowercase, hyphen delimited key.
   *
   * For our use cases this is fine, because dog breeds dont have duplicate names.
   * @param inboundBreed The user supplied breed.
   */
  public addNameKey(inboundBreed: CreateBreedDto): IBreedWithKey {
    if (this.invalidDisplayName(inboundBreed)) {
      throw new InvalidInboundBreedException(inboundBreed);
    }

    const displayNameParts = inboundBreed.displayName.split(' ').map(e => e.toLowerCase());

    return {
      ...inboundBreed,
      breedNameKey: displayNameParts.join('-'),
    } as IBreedWithKey;
  }

  private invalidDisplayName(inboundBreed: CreateBreedDto): boolean {
    return !inboundBreed.displayName || inboundBreed.displayName.length < 1;
  }
}
