import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

// Test end-to-end (e2e) de l'application NestJS
// Permet de vérifier le fonctionnement global de l'API (REST et GraphQL)
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // Avant chaque test, on démarre une instance complète de l'application
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test de la route GET / (REST)
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Test d'une requête GraphQL pour récupérer tous les animaux
  it('should return all animals', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            animals {
              id
              name
              species
            }
          }
        `,
      })
      .expect(200)
      .expect((res: request.Response) => {
        const body = res.body as AnimalsResponse;
        expect(body.data && Array.isArray(body.data.animals)).toBe(true);
        // Tu peux ajouter d'autres vérifications selon tes besoins
      });
  });
});

interface AnimalsResponse {
  data: {
    animals: Array<{ id: string; name: string; species: string }>;
  };
}
