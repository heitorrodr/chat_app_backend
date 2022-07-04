import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "src/users/user.entity";

@Entity({name: "chat"})
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'user1' })
    user1: User;

    @ManyToOne(() => User, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'user2' })
    user2: User;

    
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}