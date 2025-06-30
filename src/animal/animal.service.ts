// src/animal/animal.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

@Injectable()
export class AnimalService {
  // Injection du repository TypeORM pour accéder à la table Animal
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  // Création d'un nouvel animal à partir d'un DTO
  // Associe l'animal à un propriétaire via ownerId
  create(createAnimalInput: CreateAnimalInput): Promise<AnimalEntity> {
    const { ownerId, ...animalData } = createAnimalInput;

    const newAnimal = this.animalRepository.create({
      ...animalData,
      owner: ownerId ? { id: ownerId } : undefined,
    });
    return this.animalRepository.save(newAnimal);
  }

  // Récupère une liste paginée d'animaux
  findAll(page = 1, limit = 10): Promise<AnimalEntity[]> {
    const skip = (page - 1) * limit;
    return this.animalRepository.find({
      skip,
      take: limit,
    });
  }

  // Récupère tous les animaux avec leur propriétaire (relation owner)
  findAllWithoutPagination(): Promise<AnimalEntity[]> {
    return this.animalRepository.find({
      relations: ['owner'],
    });
  }

  // Récupère tous les animaux d'un propriétaire donné
  findByOwnerId(ownerId: number): Promise<AnimalEntity[]> {
    return this.animalRepository.find({
      where: { ownerId },
      relations: ['owner'],
    });
  }

  // Récupère un animal par son id, avec son propriétaire
  // Lève une exception si l'animal n'existe pas
  async findOne(id: number): Promise<AnimalEntity> {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  // Met à jour un animal à partir d'un DTO
  // Utilise preload pour fusionner les données existantes et nouvelles
  // Lève une exception si l'animal n'existe pas
  async update(
    id: number,
    updateAnimalInput: UpdateAnimalInput,
  ): Promise<AnimalEntity> {
    const { id: inputId, ownerId, ...animalData } = updateAnimalInput;

    const updatedAnimal = await this.animalRepository.preload({
      id: inputId,
      ...animalData,
      owner: ownerId !== undefined ? { id: ownerId } : undefined,
    });

    if (!updatedAnimal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }

    return this.animalRepository.save(updatedAnimal);
  }

  // Supprime un animal par son id
  // Lève une exception si l'animal n'existe pas
  async remove(id: number): Promise<AnimalEntity> {
    const animalToRemove = await this.findOne(id);
    await this.animalRepository.remove(animalToRemove);
    return animalToRemove;
  }
}
