import { Module } from '@nestjs/common';
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
import { Role } from './roles/role.entity';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [User,Association,Role],
      synchronize: true,
    }),
    AccountModule,
    UsersModule,
    AssociationsModule,
    AuthModule,
    JwtModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
