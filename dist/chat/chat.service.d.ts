import { Repository } from "typeorm";
import { Chat } from "src/chats/chats.entity";
export declare class ChatService {
    private chatsRepository;
    constructor(chatsRepository: Repository<Chat>);
    create(payload: any): Promise<import("typeorm").InsertResult>;
    remove(payload: any): Promise<any>;
    listAll(payload: any): Promise<any>;
    removeReceiver(payload: any): Promise<any>;
}
