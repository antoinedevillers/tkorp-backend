import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Contrôleur principal de l'application (expose une route GET /)
@Controller()
export class AppController {
  // Injection du service principal
  constructor(private readonly appService: AppService) {}

  // Route GET / qui retourne un message de bienvenue
  @Get()
  getHello(): string {
    // Délègue la logique au service
    return this.appService.getHello();
  }
}
