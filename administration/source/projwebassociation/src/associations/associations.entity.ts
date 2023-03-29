import { User, UserWithRole } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(()=>User,{eager : true})
  @JoinTable()
  public users : User[];  

  @Column()
  public name : string;
}

export class AssociationWithRoles {
  id : number;
  users : UserWithRole[]
  name : string
}
