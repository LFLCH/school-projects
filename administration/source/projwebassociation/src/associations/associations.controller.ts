// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { Association, AssociationWithRoles } from './associations.entity';
import { AssociationsService } from './associations.service';

export class AssoInput {
  @ApiProperty({
    description: "Ids des utilisateurs que contient l'association",
    example: [1, 2, 3],
    type: Array,
  })
  public idUsers: number[];
  @ApiProperty({
    description: "Nom de l'association",
    example: "Mon association",
    type: String,
  })
  public name: string;
}
export class IdInput {
  @ApiProperty({
    description: "Id de l'association",
    default: 1,
    type: Number,
  })
  public id: number;
}

export class IdAndRoleInput {
  @ApiProperty({
    description: "Id de l'association",
    default: 1,
    type: Number,
  })
  public id: number;

  @ApiProperty({
    description: "Nom du role",
    example: "Membre",
    type: String,
  })
  public roleName: string;
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@ApiTags('associations')
@Controller('associations')
export class AssociationsController {

  constructor(
    private assoService: AssociationsService
  ) { }

  // Philosophie CRUD : Create Retrieve Update Delete
  @Post()
  @ApiOperation({ summary: 'Ajouter une nouvelle association' })
  @ApiCreatedResponse({
    description: 'Liste de toutes les associations retournée avec succès.'
  })
  create(@Body() input: AssoInput): Promise<Association> {
    const idUsers: number[] = input.idUsers;
    return this.assoService.create(idUsers, input.name);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les associations' })
  @ApiCreatedResponse({
    description: 'Associations has been successfully recovered.'
  })
  getAllassos(): Promise<Association[]> {
    return this.assoService.getAllAssos();
  }


  @Get('withroles')
  @ApiOperation({ summary: 'Récupérer toutes les associations avec role' })
  @ApiCreatedResponse({
    description: 'Associations has been successfully recovered.'
  })
  getAllassosWithRole(): Promise<AssociationWithRoles[]> {
    try {
      return this.assoService.getAllAssosWithRoles();
    }
    catch(error){
      throw error;
    }
  }

  @ApiOperation({ summary: 'Récupérer une association' })
  @ApiCreatedResponse({
    description: 'Association has been successfully recovered.'
  })
  @Get(':id')
  getSpecificUser(@Param() parameter: IdInput): Promise<Association> {
    try {
      return this.assoService.getSpecificAsso(parameter.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Récupérer une association' })
  @ApiCreatedResponse({
    description: 'Association has been successfully recovered.'
  })
  @Get(':id/withroles')
  getSpecificAssoWithRoles(@Param() parameter: IdInput): Promise<AssociationWithRoles> {
    return this.assoService.getSpecificAssoWithRoles(parameter.id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier une association' })
  @ApiCreatedResponse({
    description: 'Association has been successfully changed.'
  })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une association' })
  @ApiCreatedResponse({
    description: 'Association has been successfully deleted.'
  })
  deleteSpecificUser(@Param() parameter: IdInput): void {
    try {
      this.assoService.deleteSpecificAsso(parameter.id);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Récupérer tous les membres d\'une association' })
  @ApiCreatedResponse({
    description: 'Users has been successfully recovered.'
  })
  getMembers(@Param() parameter: IdInput): Promise<User[]> {
    try {
      return this.assoService.getMembers(parameter.id);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id/roles')
  @ApiOperation({ summary: 'Récupérer tous les noms des roles au sein de l\'association' })
  @ApiCreatedResponse({
    description: 'Role names has been successfully recovered.'
  })
  getRolesByAssociation(@Param() parameter: IdInput): Promise<String[]> {
    try {
      return this.assoService.getRolesByAssociation(parameter.id);
    } catch (error) {
      throw error;
    }
  }


  @Get(':id/roles/:roleName')
  @ApiOperation({ summary: 'Récupérer tous les utilisateur de l\'association ayant le rôle donné en paramètre' })
  @ApiCreatedResponse({
    description: 'Role names has been successfully recovered.'
  })
  getUserSpecificRole(@Param() parameter: IdAndRoleInput): Promise<User[]> {
    try {
      return this.assoService.getUserSpecificRole(parameter.id, parameter.roleName);
    } catch (error) {
      throw error;
    }
  }
}
