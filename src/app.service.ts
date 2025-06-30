import { Injectable } from '@nestjs/common';

// Service principal de l'application (logique simple ou partagée)
@Injectable()
export class AppService {
  // Retourne un message de bienvenue (utilisé par le contrôleur)
  getHello(): string {
    return 'Hello World!';
  }
}
