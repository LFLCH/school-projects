/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersServiceService } from './users.service.service';

export class UserInput {
  @ApiProperty({
    description: "Prénom de l'utilisateur",
    example: "John",
    type: String,
  })
  public firstname: string;
  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: "Doe",
    type: String,
  })
  public lastname: string;
  @ApiProperty({
    description: "Âge de l'utilisateur",
    example: 23,
    minimum : 18,
    type: Number,
})
public age: number;
public password : string;
}

export class IdInput {
  @ApiProperty({
    description: "Id de l'utilisateur",
    default: 1,
    type: Number,
})
  public id : number;
}


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService : UsersServiceService){}
  // Philosophie CRUD : Create Retrieve Update Delete
  @ApiCreatedResponse({
    description: 'Utilisateur créé avec succès.'
  })
  @Post()
  create(@Body() input:UserInput):Promise<User>{
    return this.userService.create(input.firstname,input.lastname, input.age, input.password);
  }
  @ApiCreatedResponse({
    description: 'Liste de tous les utilisateurs retournée avec succès.'
  })

  @Get()
  async getAllusers():Promise<User[]>{
    return this.userService.getAllusers();
  }
  @ApiCreatedResponse({
    description: 'Utilisateur retourné avec succès.'
  })
  @Get(':id')
  async getSpecificUser(@Param() parameter:IdInput):Promise<User>{
    try {
      return this.userService.getSpecificUser(parameter.id);
    } catch (error) {
      throw error;
    }
  }
  @ApiCreatedResponse({
    description: 'Utilisateur modifié avec succès.'
  })
  @Put(':id')
  async setSpecificUser(@Param() parameter : IdInput, @Body() input : UserInput):Promise<User>{
    try{
      return this.userService.setSpecificUser(parameter.id,input.firstname,input.lastname,input.age,undefined);
    } catch(error){
      throw error;
    }
  }
  @ApiCreatedResponse({
    description: 'Utilisateur supprimé avec succès.'
  })
  @Delete(':id')
  async deleteSpecificUser(@Param() parameter : IdInput):Promise<void>{
    try {
      await this.userService.deleteSpecificUser(parameter.id);
    } catch (error) {
      throw error;
    }
  }
}
