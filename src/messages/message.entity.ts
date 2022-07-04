import { Chat } from "src/chats/chats.entity";
import { User } from "src/users/user.entity";
import { Column, PrimaryGeneratedColumn, UpdateDateColumn,Entity, ManyToOne, ManyToMany, JoinColumn, CreateDateColumn, } from "typeorm";

@Entity({name: "message"})
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public content: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "sender_id"})
    user: User

    @ManyToOne(() => Chat, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "chat"})
    chat: Chat;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

}