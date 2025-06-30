import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { AnimalEntity } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

// Resolver GraphQL pour exposer les opérations sur les animaux
@Resolver(() => AnimalEntity)
export class AnimalResolver {
  // Injection du service métier pour déléguer la logique
  constructor(private readonly animalService: AnimalService) {}

  // Mutation GraphQL : création d'un animal
  @Mutation(() => AnimalEntity)
  createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
  ) {
    return this.animalService.create(createAnimalInput);
  }

  // Query GraphQL : liste paginée des animaux
  // Permet de passer page et limit en arguments
  @Query(() => [AnimalEntity], { name: 'animals' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 10,
  ) {
    return this.animalService.findAll(page, limit);
  }

  // Query GraphQL : liste complète des animaux (sans pagination)
  // Utile pour des statistiques ou la FAQ
  @Query(() => [AnimalEntity], { name: 'animalsWithoutPagination' })
  findAllWithoutPagination() {
    return this.animalService.findAllWithoutPagination();
  }

  // Query GraphQL : récupérer un animal par son id
  @Query(() => AnimalEntity, { name: 'animal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.animalService.findOne(id);
  }

  // Mutation GraphQL : mise à jour d'un animal
  @Mutation(() => AnimalEntity)
  updateAnimal(
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
  ) {
    return this.animalService.update(updateAnimalInput.id, updateAnimalInput);
  }

  // Mutation GraphQL : suppression d'un animal
  @Mutation(() => AnimalEntity)
  removeAnimal(@Args('id', { type: () => Int }) id: number) {
    return this.animalService.remove(id);
  }
}
