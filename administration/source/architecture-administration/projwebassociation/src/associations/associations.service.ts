/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersServiceService } from 'src/users/users.service.service';
import { Repository } from 'typeorm/repository/Repository';
import { Association } from './associations.entity';
import { Message } from './message.entity';


@Injectable()
export class AssociationsService {

  constructor(
    private userService: UsersServiceService,
    @InjectRepository(Association) private repository: Repository<Association>,
    @Inject('MSG_SERVICE') private client: ClientProxy
  ) {
    this.userService.getAllusers().then(users => {
      if (users.length === 0) { // remplissage de la bdd si elle est vide
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
                                    this.userService.create('Marcus', 'Thuram', 27, 'champion');
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

  }

  async create(idUsers: number[], name: string): Promise<Association> {
    return new Promise<Association>(res => {
      this.getUsers(idUsers).then(members => {
        const repoAsso = this.repository.create({ users: members, name });
        this.repository.save(repoAsso).then(asso => {
          res(asso)
        });
        this.sendMessage(name, members);
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
  async setSpecificAsso(id: number, idUsers: number[], name: string): Promise<Association> {
    return await this.getSpecificAsso(id).then(async asso => {
      try {
        const new_name = (name !== undefined) ? name : asso.name;
        asso.name = new_name;
        if (idUsers !== undefined) {
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
      await this.getSpecificAsso(id).then(asso => {
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
   * Envoi un message de bienvenue aux membres de la nouvelle association créée
   * Message envoyé au rabbitMQ à la queue 'messages'
   * @param nameAsso : nom de l'association
   * @param members : membre de l'association
   */
  async sendMessage(nameAsso: string, members: User[]) {
    for (const user of members) {
      const email: string = user.firstname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "." + user.lastname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "@mail.com";
      const subject: string = "Adhésion association " + nameAsso;
      const text: string = "Bonjour " + user.firstname + " " + user.lastname + ", vous êtes maintenant membre de l'association " + nameAsso + ".";
      const ical: string = "ical";

      const msg: Message = {
        email: email,
        subject: subject,
        text: text,
        ical: ical
      }

      const record = new RmqRecordBuilder(msg)
        .setOptions({
          contentType: "application/json"
        })
        .build();


      this.client.emit('messages', record);
    }
  }

}
