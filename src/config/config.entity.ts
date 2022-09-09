import { Chat } from "src/chats/chats.entity";
import { User } from "src/users/user.entity";
import {  PrimaryGeneratedColumn, UpdateDateColumn,Entity, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";

@Entity({name: "message"})
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "user"})
    user: User

    

}