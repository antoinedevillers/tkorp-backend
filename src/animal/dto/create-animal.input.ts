import { InputType, Field, Int } from '@nestjs/graphql';

// DTO (Data Transfer Object) pour la création d'un animal via GraphQL
@InputType()
export class CreateAnimalInput {
  // Nom de l'animal
  @Field()
  name: string;

  // Date de naissance
  @Field(() => String, { nullable: true })
  dateOfBirth?: string;

  // Espèce de l'animal
  @Field()
  species: string;

  // Race
  @Field({ nullable: true })
  breed?: string;

  // Couleur
  @Field()
  color: string;

  // Identifiant du propriétaire
  @Field(() => Int)
  ownerId: number;
}
