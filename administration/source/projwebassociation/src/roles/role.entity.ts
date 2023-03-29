import { Association } from "src/associations/associations.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id, {eager: true})
    public user: User;

    @ManyToOne(() => Association, association => association.id, {eager: true})
    public association: Association;

    @Column()
    public name: string;
}
