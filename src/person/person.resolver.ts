import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonEntity } from './person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { AnimalService } from '../animal/animal.service';
import { AnimalEntity } from '../animal/animal.entity';

// Resolver GraphQL pour exposer les opérations sur les personnes
@Resolver(() => PersonEntity)
export class PersonResolver {
  // Injection des services métier pour déléguer la logique
  constructor(
    private readonly personService: PersonService,
    private readonly animalService: AnimalService,
  ) {}

  // Mutation GraphQL : création d'une personne
  @Mutation(() => PersonEntity)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personService.create(createPersonInput);
  }

  // Query GraphQL : liste paginée des personnes
  @Query(() => [PersonEntity], { name: 'persons' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 10,
  ) {
    return this.personService.findAll(page, limit);
  }

  // Query GraphQL : liste complète des personnes (sans pagination)
  @Query(() => [PersonEntity], { name: 'personsWithoutPagination' })
  findAllWithoutPagination() {
    return this.personService.findAllWithoutPagination();
  }

  // Query GraphQL : récupérer une personne par son id
  @Query(() => PersonEntity, { name: 'person' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.personService.findOne(id);
  }

  // ResolveField : permet de résoudre dynamiquement le champ 'animals' d'une personne
  // Appelle le service animal pour récupérer les animaux du propriétaire
  @ResolveField('animals', () => [AnimalEntity])
  getAnimals(@Parent() person: PersonEntity) {
    return this.animalService.findByOwnerId(person.id);
  }

  // Mutation GraphQL : mise à jour d'une personne
  @Mutation(() => PersonEntity)
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ) {
    return this.personService.update(updatePersonInput.id, updatePersonInput);
  }

  // Mutation GraphQL : suppression d'une personne
  @Mutation(() => PersonEntity)
  removePerson(@Args('id', { type: () => Int }) id: number) {
    return this.personService.remove(id);
  }
}
