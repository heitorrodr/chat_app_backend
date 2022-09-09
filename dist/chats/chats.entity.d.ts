import { User } from "src/users/user.entity";
export declare class Chat {
    id: number;
    message: string;
    user1: User;
    user2: User;
    photo?: string;
    video?: string;
    audio?: string;
    isStatus: number;
    createdAt: Date;
    updatedAt: Date;
}
