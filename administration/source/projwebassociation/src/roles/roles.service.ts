import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from 'src/associations/associations.entity';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';
import { UsersServiceService } from 'src/users/users.service.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {

    constructor(
        private userService: UsersServiceService,
        @Inject(forwardRef(() => AssociationsService))
        private assoService: AssociationsService,
        @InjectRepository(Role) 
        private repository: Repository<Role>
    ) {}

    async create(name: string, idUser: number, idAssociation: number) : Promise<Role> {
        let user: User;
        let asso: Association;
        try {
            user = await this.userService.getSpecificUser(idUser);
            asso = await this.assoService.getSpecificAsso(idAssociation);
        }
        catch (error) {
            return error;
        }

        const newRole: Role = this.repository.create({
            user: user,
            association: asso,
            name: name,
        });
        await this.repository.save(newRole);
        return newRole;
    }

    async getAllRoles() : Promise<Role[]> {
        return await this.repository.find();
    }

    async getById(idUser: number, idAssociation: number) : Promise<Role> {
        let user: User;
        let asso: Association;
        try {
            user = await this.userService.getSpecificUser(idUser);
            asso = await this.assoService.getSpecificAsso(idAssociation);
        }
        catch (error) {
            throw error;
        }
        const role: Role = await this.repository.findOne({
            where: {
                user: user,
                association: asso
            }
        });
        if(role === null) throw new HttpException('Could not find a role with the idUser ' + idUser + ' and the idAssociation ' + idAssociation, HttpStatus.NOT_FOUND);
        else return role;
    }

    async putById(idUser: number, idAssociation: number, name: string) : Promise<Role> {
        if(name != undefined) {
            try {
                const roleToUpdate: Role = await this.getById(idUser, idAssociation);
                roleToUpdate.name = name;
                await this.repository.save(roleToUpdate);
                return roleToUpdate;
            }
            catch(error) {
                return error
            }
        }
        else {
            throw new HttpException('Could not find a name in input', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteById(idUser: number, idAssociation: number) : Promise<Boolean> {
        try {
            const roleToDelete: Role = await this.getById(idUser, idAssociation);
            await this.repository.delete(roleToDelete);
            return (roleToDelete != null);
        }
        catch(error) {
            throw error
        }
    }

    async getAllByUserId(idUser: number) : Promise<Role[]> {
        let user: User;
        try {
            user = await this.userService.getSpecificUser(idUser);
        }
        catch (error) {
            throw error;
        }
        const roles: Role[] = await this.repository.find({
            where: {
                user: user,
            }
        });
        if(roles === null) throw new HttpException('Could not find a role with the idUser ' + idUser, HttpStatus.NOT_FOUND);
        else return roles;
    }

    async getAllUsersByName(name: string): Promise<User[]> {
        const roles: Role[] = await this.repository.find({
            where: {
                name: name
            }
        })

        let users: User[] = [];
        for(const role of roles) {

            users.push(role.user);
        }
        return users
    }

    async deleteAllUserRoles(idUser : number) : Promise<void>{
        try {
           const assos = (await  this.assoService.getAllAssos()).filter(asso=>{
            return asso.users.filter(user=>{return user.id==idUser}).length>0;
           })
           for(const asso of assos){
             await this.deleteById(idUser,asso.id);
           }
        }
        catch(error){
            throw error;
        }
        
    }
}
