import { Chat } from "src/chats/chats.entity";
import { User } from "src/users/user.entity";
import { Column, PrimaryGeneratedColumn, UpdateDateColumn,Entity, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";

@Entity({name: "call_"})
export class Call{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'sender_id' })
    senderId: number;

    @Column({name: 'is_message'})
    isMessage: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "sender_id"})
    sender: User;

    @Column({ name: 'receiver_id' })
    receiverId: number;

    @ManyToOne(() => User, {eager: true})
    @JoinColumn({name: "receiver_id"})
    receiver: User;


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

}