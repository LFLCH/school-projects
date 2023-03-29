import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations/associations.entity';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'mydatabase.db',
    //   entities: [User,Association],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db',
      entities: [User,Association, Event],
      synchronize: true,
    }),
    AccountModule,
    UsersModule,
    AssociationsModule,
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
