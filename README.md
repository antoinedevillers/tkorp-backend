# Backend – Gestion Animaux & Personnes

API NestJS pour gérer des animaux et des personnes, avec support GraphQL et REST.

## Prérequis

- Node.js >= 18.x
- npm >= 9.x
- (Optionnel) Base de données PostgreSQL/MySQL

## Installation

```bash
npm install
```

## Configuration

Si besoin, créez un fichier `.env` à la racine du dossier backend :
```
DATABASE_URL=postgres://user:password@localhost:5432/ma_base
```

## Lancement

```bash
npm run start:dev
```

- Accès GraphQL : http://localhost:3000/graphql
- Accès REST : http://localhost:3000/

## Exemples de requêtes

### Requête GraphQL
```graphql
query {
  animals {
    id
    name
    species
  }
}
```

### Requête REST
```http
GET http://localhost:3000/
```

## Structure du projet

- `src/animal` : gestion des animaux (entité, service, resolver, DTO)
- `src/person` : gestion des personnes (entité, service, resolver, DTO)
- `src/app.module.ts` : configuration principale (imports, TypeORM, GraphQL)

## Tests

```bash
npm run test        # tests unitaires
npm run test:e2e    # tests end-to-end
```

## Auteur

- Antoine

## Licence

MIT
