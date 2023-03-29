/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersServiceService {

  constructor(@InjectRepository(User) private repository : Repository<User>){
  }

  public async hash(password : string|undefined) : Promise<string>{
    if(password===undefined)return '';
    const saltOrRounds = 10;
    const hashed = await bcrypt.hash(password, saltOrRounds);
    return hashed;
  }

  public async isValidPassword(user : User, password : string): Promise<boolean>{
    return await bcrypt.compare(password, user.password);
  }

  public async create(firstname: string, lastname: string, age : number, password : string): Promise<User> {
    password = await this.hash(password);
    const repoUser =  this.repository.create({firstname,lastname,age,password});
    await this.repository.save(repoUser);
    return repoUser;
  }
  async getAllusers():Promise<User[]>{
    return this.repository.find();
  }
  async getSpecificUser(id : number):Promise<User>{
    const user : User =  await this.repository.findOne(
      {
        where :{
          id : id,
        },
      }
    )
    if(user==null) throw new HttpException("Il n'existe pas d'utilisateur avec l'id suivant : "+id,HttpStatus.NOT_FOUND);
    else return user;
  }
  
  async setSpecificUser(id : number,  firstname : string | undefined,lastname : string | undefined, age : number | undefined, password : string | undefined):Promise<User>{
    return await this.getSpecificUser(id).then(async user=>{
      try{
        const new_lastname = (lastname !== undefined)?lastname : user.lastname;
        const new_firstname = (firstname !== undefined)?firstname : user.firstname;
        const new_age = (age !== undefined)?age:user.age;
        const new_passwrd = (password !== undefined)?password:user.password;
        user.lastname = new_lastname;
        user.firstname = new_firstname;
        user.age = new_age;
        user.password = new_passwrd;
        this.repository.save(user);
        return user;
      }
      catch(error){
        throw error;
      }
    });
  }
  async deleteSpecificUser(id:number):Promise<void>{
    try{
     const user = await this.getSpecificUser(id)
     await this.repository.delete(user);
    }
    catch(error){
      throw error;
    }
  }
}
