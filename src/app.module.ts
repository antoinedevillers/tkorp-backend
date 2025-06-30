import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AnimalModule } from './animal/animal.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Module principal de l'application
@Module({
  imports: [
    // Configuration de la connexion à la base de données MySQL avec TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql', // Type de la BDD
      host: 'localhost',
      port: 3306,
      username: 'root', // Par défaut avec XAMPP
      password: '', // Par défaut avec XAMPP
      database: 'test_tkorp', // Le nom de la BDD que vous avez créée
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chemin vers vos futures entités
      // synchronize: true est UTILE en dev pour créer les tables automatiquement,
      // mais DANGEREUX en prod car il peut effacer des données.
      synchronize: true,
    }),
    // Import des modules métiers
    PersonModule,
    AnimalModule,
    // Configuration du serveur GraphQL Apollo
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'), // Génère le schéma ici
      sortSchema: true, // Trie le schéma par ordre alphabétique
    }),
  ],
  // Déclaration des contrôleurs (REST)
  controllers: [AppController],
  // Déclaration des providers (services injectables)
  providers: [AppService],
})
export class AppModule {}
