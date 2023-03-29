import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { Message } from './associations/message.entity';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Bienvenue sur le backend de gestion des associations.';
  }

}
