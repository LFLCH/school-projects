import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenue sur le backend de gestion des associations.';
  }
}
