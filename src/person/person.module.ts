import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';
import { AnimalModule } from '../animal/animal.module';

// Module Person : regroupe l'entité, le service et le resolver liés à la gestion des personnes
@Module({
  // Import du module TypeORM pour injecter le repository PersonEntity
  // Import du module Animal pour pouvoir injecter AnimalService dans le resolver
  imports: [TypeOrmModule.forFeature([PersonEntity]), AnimalModule],
  // Déclaration des providers (service et resolver)
  providers: [PersonResolver, PersonService],
})
export class PersonModule {}
