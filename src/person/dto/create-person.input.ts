import { InputType, Field } from '@nestjs/graphql';

// DTO (Data Transfer Object) pour la création d'une personne via GraphQL
@InputType()
export class CreatePersonInput {
  // Prénom de la personne
  @Field()
  firstName: string;

  // Nom de la personne
  @Field()
  lastName: string;

  // Email de la personne
  @Field()
  email: string;

  // Numéro de téléphone
  @Field({ nullable: true })
  phoneNumber?: string;
}
