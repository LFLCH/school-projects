// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

export class AssoInput{
  @ApiProperty({
    description: "Ids des utilisateurs que contient l'association",
    example: [1,2,3],
    type: Array,
  })
  public idUsers : number[];
  @ApiProperty({
    description: "Nom de l'association",
    example: "Mon association",
    type: String,
  })
  public name : string;
}
export class IdInput {
  @ApiProperty({
    description: "Id de l'association",
    default: 1,
    type: Number,
})
  public id : number;
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
  constructor(private assoService: AssociationsService) {}
  // Philosophie CRUD : Create Retrieve Update Delete
  @ApiCreatedResponse({
    description: 'Liste de toutes les associations retournée avec succès.'
  })
  @Post()
  create(@Body() input: AssoInput): Promise<Association> {
    const idUsers: number[] = input.idUsers;
    return this.assoService.create(idUsers, input.name);
  }
  @Get()
  getAllusers(): Promise<Association[]> {
    return this.assoService.getAllAssos();
  }
  @ApiCreatedResponse({
    description: 'Association retournée avec succès.'
  })
  @Get(':id')
  getSpecificUser(@Param() parameter: IdInput): Promise<Association> {
    try {
      return this.assoService.getSpecificAsso(parameter.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiCreatedResponse({
    description: 'Association modifiée avec succès.'
  })
  @Put(':id')
  setSpecificUser(@Param() parameter: IdInput, @Body() input: AssoInput): Promise<Association> {
    try {
      return this.assoService.setSpecificAsso(
        parameter.id,
        input.idUsers,
        input.name,
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiCreatedResponse({
    description: 'Association supprimée avec succès.'
  })
  @Delete(':id')
  deleteSpecificUser(@Param() parameter: IdInput): void {
    try {
      this.assoService.deleteSpecificAsso(parameter.id);
    } catch (error) {
      throw error;
    }
  }
  @ApiCreatedResponse({
    description: "Liste des membres de l'association retournée avec succès",
  })
  @Get(':id/members')
  getMembers(@Param() parameter: IdInput): Promise<User[]> {
    try {
      return this.assoService.getMembers(parameter.id);
    } catch (error) {
      throw error;
    }
  }
}
