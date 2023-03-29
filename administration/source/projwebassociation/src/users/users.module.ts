import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersServiceService } from './users.service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(()=> RolesModule)

],
  controllers: [UsersController],
  providers: [UsersServiceService],
  exports: [UsersServiceService],
})
export class UsersModule {}
