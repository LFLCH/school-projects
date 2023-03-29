import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { RolesService } from './roles.service';

export class IdInput {
    @ApiProperty({
        description: 'The id of the user',
        minimum: 1,
        default: 1,
        type: Number,
    })
    public idUser: number;

    @ApiProperty({
        description: 'The id of the association',
        minimum: 1,
        default: 1,
        type: Number,
    })
    public idAssociation: number;
}

export class NameInput {
    @ApiProperty({
        description: 'The name of the role of the given user in the given association',
        example: "President",
        type: String,
    })
    public name: string;
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@ApiTags('roles')
@Controller('roles')
export class RolesController {
    
    constructor(
        private roleService: RolesService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Ajouter un nouveau rôle' })
    @ApiCreatedResponse({
        description: 'The role has been successfully created.'
    })
    async create(@Body() input: RoleInput): Promise<Role> {
        return await this.roleService.create(input.name, input.idUser, input.idAssociation);
    }

    @Get()
    @ApiOperation({ summary: 'Récupérer tous les rôles' })
    @ApiCreatedResponse({
        description: 'Roles has been successfully recovered.'
    })
    async getAllRoles(): Promise<Role[]> {
        return await this.roleService.getAllRoles();
    }

    @Get('/users/:name')
    @ApiOperation({ summary: 'Récupérer tous les utilisateurs selon le rôle entré en paramètre' })
    @ApiCreatedResponse({
        description: 'Users has been successfully recovered.'
    })
    async getAllUsersByName(@Param() input: NameInput): Promise<User[]> {
        return await this.roleService.getAllUsersByName(input.name);
    }

    @Get(':idUser/:idAssociation')
    @ApiOperation({ summary: 'Récupérer le rôle de l\'utilisateur au sein de l\'association' })
    @ApiCreatedResponse({
        description: 'Role has been successfully recovered.'
    })
    async getById(@Param() parameter: IdInput): Promise<Role> {
        try {
            return await this.roleService.getById(parameter.idUser, parameter.idAssociation);
        }
        catch (error) {
            throw error;
        }
    }

    @Put(':idUser/:idAssociation')
    @ApiOperation({ summary: 'Modifier un rôle' })
    @ApiCreatedResponse({
        description: 'Role has been successfully changed.'
    })
    async putById(@Param() parameter: IdInput, @Body() input: RoleUpdate): Promise<Role> {
        try {
            return await this.roleService.putById(parameter.idUser, parameter.idAssociation, input.name);
        }
        catch (error) {
            throw error;
        }
    }

    @Delete(':idUser/:idAssociation')
    @ApiOperation({ summary: 'Supprimer un rôle' })
    @ApiCreatedResponse({
        description: 'Role has been successfully deleted.'
    })
    async deleteById(@Param() parameter: IdInput): Promise<Boolean> {
        try {
            return await this.roleService.deleteById(parameter.idUser, parameter.idAssociation);
        }
        catch (error) {
            throw error;
        }
    }
}
