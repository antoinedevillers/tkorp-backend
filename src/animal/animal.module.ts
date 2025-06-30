import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalResolver } from './animal.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './animal.entity';

// Module Animal : regroupe l'entité, le service et le resolver liés à la gestion des animaux
@Module({
  // Import du module TypeORM pour injecter le repository AnimalEntity
  imports: [TypeOrmModule.forFeature([AnimalEntity])],
  // Déclaration des providers (service et resolver)
  providers: [AnimalResolver, AnimalService],
  // Export du service pour qu'il soit accessible dans d'autres modules
  exports: [AnimalService],
})
export class AnimalModule {}
