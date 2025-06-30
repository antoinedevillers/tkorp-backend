import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { PersonEntity } from './person.entity';

@Injectable()
export class PersonService {
  // Injection du repository TypeORM pour accéder à la table Person
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  // Création d'une nouvelle personne à partir d'un DTO
  create(createPersonInput: CreatePersonInput): Promise<PersonEntity> {
    const newPerson = this.personRepository.create({
      ...createPersonInput,
    });

    return this.personRepository.save(newPerson);
  }

  // Récupère une liste paginée de personnes avec leurs animaux
  findAll(page = 1, limit = 10): Promise<PersonEntity[]> {
    const skip = (page - 1) * limit;
    return this.personRepository.find({
      relations: ['animals'],
      skip,
      take: limit,
    });
  }

  // Récupère toutes les personnes avec leurs animaux
  findAllWithoutPagination(): Promise<PersonEntity[]> {
    return this.personRepository.find({
      relations: ['animals'],
    });
  }

  // Récupère une personne par son id
  // Lève une exception si la personne n'existe pas
  async findOne(id: number): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  // Met à jour une personne à partir d'un DTO
  // Utilise preload pour fusionner les données existantes et nouvelles
  // Lève une exception si la personne n'existe pas
  async update(
    id: number,
    updatePersonInput: UpdatePersonInput,
  ): Promise<PersonEntity> {
    const { id: inputId, ...personData } = updatePersonInput;

    const updatedPerson = await this.personRepository.preload({
      id: inputId,
      ...personData,
    });

    if (!updatedPerson) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return this.personRepository.save(updatedPerson);
  }

  // Supprime une personne par son id
  // Lève une exception si la personne n'existe pas
  async remove(id: number): Promise<PersonEntity> {
    const animalToRemove = await this.findOne(id);
    await this.personRepository.remove(animalToRemove);
    return animalToRemove;
  }
}
