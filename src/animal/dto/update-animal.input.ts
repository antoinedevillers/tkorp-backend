import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.input';

@InputType()
// La classe UpdateAnimalInput hérite de CreateAnimalInput,
// mais PartialType rend tous les champs hérités optionnels.
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  // L'ID est le seul champ requis pour savoir quelle entité mettre à jour.
  @Field(() => Int)
  id: number;
}
