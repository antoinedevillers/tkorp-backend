import { CreatePersonInput } from './create-person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
// La classe UpdatePersonInput hérite de CreatePersonInput,
// mais PartialType rend tous les champs hérités optionnels
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  // L'ID est le seul champ requis pour savoir quelle entité mettre à jour
  @Field(() => Int)
  id: number;
}
