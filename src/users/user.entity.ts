import { Message } from "src/messages/message.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    @Column({default: ''})
    firstName: string;
    @Column({default: ''})
    lastName: string;
    @Column({default: true})
    isActive: boolean;
    @OneToMany(() => Message, (message) => message.user)
    @JoinColumn()
    messages: Message[]

}