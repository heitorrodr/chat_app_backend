import { Chat } from "src/chats/chats.entity";
import { User } from "src/users/user.entity";
export declare class Message {
    id: number;
    content: string;
    user: User;
    chat: Chat;
    createdAt: Date;
    updatedAt: Date;
}
