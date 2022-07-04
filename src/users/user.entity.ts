import { Message } from "src/messages/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

}