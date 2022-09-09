import { User } from "src/users/user.entity";
export declare class Call {
    id: number;
    senderId: number;
    isMessage: number;
    sender: User;
    receiverId: number;
    receiver: User;
    createdAt: Date;
    updatedAt: Date;
}
