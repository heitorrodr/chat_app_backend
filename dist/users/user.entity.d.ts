import { Message } from "src/messages/message.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    messages: Message[];
}
