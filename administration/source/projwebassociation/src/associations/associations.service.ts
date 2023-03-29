/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { User, UserWithRole } from 'src/users/user.entity';
import { UsersServiceService } from 'src/users/users.service.service';
import { Repository } from 'typeorm/repository/Repository';
import { Association, AssociationWithRoles } from './associations.entity';


@Injectable()
export class AssociationsService {

  constructor(
    private userService: UsersServiceService,
    @Inject(forwardRef(() => RolesService))
    private roleService: RolesService,
    @InjectRepository(Association) private repository: Repository<Association>
  ) {
    this.getAllAssos().then(assos => {
      this.userService.getAllusers().then(users => {
        if (assos.length === 0 && users.length === 0) { // remplissage de la bdd si elle est vide
          this.userService.create('Hugo', 'Lloris', 35, 'valid_password').then(() => {
            this.userService.create('Antoine', 'Griezmann', 27, 'ballondor').then(() => {
              this.userService.create('Benjamin', 'Pavard', 26, 'champion').then(() => {
                this.userService.create('Raphaël', 'Varane', 29, 'champion').then(() => {
                  this.userService.create('Jules', 'Koundé', 24, 'champion').then(() => {
                    this.userService.create('Lucas', 'Hernandez', 26, 'champion').then(() => {
                      this.userService.create('Aurélien', 'Tchouaméni', 22, 'champion').then(() => {
                        this.userService.create('Adrien', 'Rabiot', 27, 'champion').then(() => {
                          this.userService.create('Eduardo', 'Camavinga', 20, 'champion').then(() => {
                            this.userService.create('Olivier', 'Giroud', 36, 'champion').then(() => {
                              this.userService.create('Kylian', 'Mbappé', 24, 'champion').then(() => {
                                this.userService.create('Ousmane', 'Dembélé', 25, 'champion').then(() => {
                                  this.userService.create('Randal', 'Kolo Muani', 24, 'champion').then(() => {
                                    this.userService.create('Kingsley', 'Coman', 26, 'champion').then(() => {
                                      this.userService.create('Marcus', 'Thuram', 27, 'champion').then(() => {
                                        this.userService.getAllusers().then(newUsers => {
                                          const idUsers: number[] = [];
                                          for (const user of newUsers) {
                                            idUsers.push(user.id);
                                          }
                                          this.create(idUsers, 'Equipe de France').then(()=>{
                                            this.roleService.putById(1,1,"Capitaine");
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        }
      })
    })
  }

  async create(idUsers: number[], name: string): Promise<Association> {
    return new Promise<Association>(async res => {
      this.getUsers(idUsers).then(members => {
        const repoAsso = this.repository.create({ users: members, name });
        this.repository.save(repoAsso).then(async asso => {
          res(asso)
          const idAsso: number = this.repository.getId(repoAsso);
          // Creation de role par defaut pour les nouveaux membre de l'association
          for (const idU of idUsers) {
            await this.roleService.create("Membre", idU, idAsso);
          }
        })

      })
    })
  }

  private async getUsers(idUsers: number[]): Promise<User[]> {
    const members: User[] = [];
    for (const iduser of idUsers) {
      try {
        await this.userService.getSpecificUser(iduser).then(user => { members.push(user); })
      } catch (error) {
        throw error;
      }
    }
    return members;
  }

  getAllAssos(): Promise<Association[]> {
    return this.repository.find();
  }

  getAllAssosWithRoles() : Promise<AssociationWithRoles[]>{
    return new Promise<AssociationWithRoles[]>(async res=>{
      const assos = await this.getAllAssos();
      const assosWithRoles : AssociationWithRoles[] = []
      for(const asso of assos){
        const assoWithRoles : AssociationWithRoles = await this.getSpecificAssoWithRoles(asso.id)
        assosWithRoles.push(assoWithRoles)
      }
      res(assosWithRoles)
    })
  }

  async getSpecificAsso(id: number): Promise<Association> {
    return await this.repository.findOne(
      {
        where: {
          id: id,
        },
      }
    ).then(user => {
      if (user == null) {
        throw new HttpException("Il n'existe pas d'association avec l'id suivant : " + id, HttpStatus.NOT_FOUND);
      }
      else return user;
    }).catch(error => { throw error; })
  }

  async getSpecificAssoWithRoles(id :number): Promise<AssociationWithRoles> {
    const asso: Association = await this.getSpecificAsso(id);
    const assoRole : AssociationWithRoles = {
      id: asso.id,
      users: [],
      name: asso.name
    }
    for (const user of asso.users) {
      const role: Role = await this.roleService.getById(user.id, id);
      const userRole : UserWithRole = {
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        age: user.age,
        role: role.name
      }
      assoRole.users.push(userRole)
    }
    return assoRole;
  }




  async setSpecificAsso(id: number, idUsers: number[], name: string): Promise<Association> {
    return await this.getSpecificAsso(id).then(async asso => {
      try {
        const new_name = (name !== undefined) ? name : asso.name;
        asso.name = new_name;
        if (idUsers !== undefined) {
          let idUsersWithRole: number[] = [];
          // Suppression de tous les roles
          for (const user of asso.users) {
            if (idUsers.includes(user.id)) {
              // On garde son role
              idUsersWithRole.push(user.id);
            }
            else {
              // Suppression du role
              await this.roleService.deleteById(user.id, id);
            }
          }
          // Creation de role par defaut pour les nouveaux membre de l'association
          for (const idU of idUsers) {
            if (!idUsersWithRole.includes(idU)) {
              await this.roleService.create("Membre", idU, id);
            }
          }
          await this.getUsers(idUsers).then(members => {
            asso.users = members;
          })
        }
        this.repository.save(asso);
        return asso;
      } catch (error) { throw error; }
    })
  }
  async deleteSpecificAsso(id: number): Promise<void> {
    try {
      await this.getSpecificAsso(id).then(async asso => {
        // Suppression des roles
        for (const user of asso.users) {
          await this.roleService.deleteById(user.id, id);
        }

        asso.users = [];
        asso.name = "todeledte";
        this.repository.save(asso);
        this.repository.delete({ id: id })
        //this.repository.delete(asso);
      })
    } catch (error) {
      throw error;
    }
  }
  /**
   * 
   * @param id un id d'association
   * @returns tous les membres de l'association
   */
  async getMembers(id: number): Promise<User[]> {
    const users = (await this.getSpecificAsso(id)).users;
    return users;
  }

  /**
   * 
   * @param id un id d'association
   * @returns tous les roles d'une association
   */
  async getRolesByAssociation(id: number): Promise<String[]> {
    let rolesName: String[] = [];
    const asso: Association = await this.getSpecificAsso(id);
    for (const user of asso.users) {
      let role: Role = await this.roleService.getById(user.id, id);
      if (!rolesName.includes(role.name)) {
        rolesName.push(role.name);
      }
    }
    return rolesName;
  }

  /**
   * 
   * @param id un id d'association
   * @param roleName un nom de role
   * @returns tous les membres ayant pour role roleName
   */
  async getUserSpecificRole(id: number, roleName: string): Promise<User[]> {
    let users: User[] = [];
    const asso: Association = await this.getSpecificAsso(id);
    for (const user of asso.users) {
      let role: Role = await this.roleService.getById(user.id, id);
      if (role.name === roleName) {
        users.push(user);
      }
    }
    return users;
  }

}
