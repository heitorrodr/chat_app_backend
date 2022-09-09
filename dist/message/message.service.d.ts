import { Repository } from "typeorm";
import { Message } from "src/messages/message.entity";
export declare class MessageService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    sendMessage(payload: any): Promise<any>;
    find(payload: any): Promise<any>;
    remove(id: any): Promise<any>;
}
