import { Chat } from "src/chats/chats.entity";
import { User } from "src/users/user.entity";
import { PrimaryGeneratedColumn, UpdateDateColumn,Entity, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";

@Entity({name: "call_"})
export class Call{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "sender_id"})
    sender_id: User

    @ManyToOne(() => User)
    @JoinColumn({name: "receiver_id"})
    receiver_id: User;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

}