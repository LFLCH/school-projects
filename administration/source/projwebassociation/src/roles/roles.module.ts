import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsModule } from 'src/associations/associations.module';
import { UsersModule } from 'src/users/users.module';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(()=>UsersModule),
    forwardRef(()=> RolesModule),
    forwardRef(() => AssociationsModule), 
    
  ],
  exports: [RolesService]
})
export class RolesModule {}
