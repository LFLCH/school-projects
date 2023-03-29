import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [
    ClientsModule.register([{
      name: 'MSG_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'messages',
        queueOptions: {
          durable: true
        }
      }
    }]),
    TypeOrmModule.forFeature([Association]),UsersModule
  ],
})
export class AssociationsModule {}
