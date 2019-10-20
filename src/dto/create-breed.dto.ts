import { CreateBreedAttributeDto } from './breed-attribute.dto';

export class CreateBreedDto {
  readonly displayName: string;
  readonly attributes: CreateBreedAttributeDto[];
}
