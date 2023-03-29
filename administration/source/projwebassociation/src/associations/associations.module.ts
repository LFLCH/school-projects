import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [
    forwardRef(()=>UsersModule),
    forwardRef(() => RolesModule),
    TypeOrmModule.forFeature([Association])
    ],
  exports: [AssociationsService]
})
export class AssociationsModule {}
