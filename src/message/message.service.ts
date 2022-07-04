import { Injectable, PayloadTooLargeException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Message } from "src/messages/message.entity"

@Injectable()
export class MessageService {
    
    constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>){}

    async sendMessage(payload: any): Promise<any> {
        return this.messagesRepository.insert({
            content: payload.content,
            user: payload.user_id,
            chat: payload.chat_id,
        })
    }
    
    find(payload: any) : Promise<any> {
        return this.messagesRepository.createQueryBuilder().select().where(
            "id = :id AND ( user1 = :user1 OR user2 = :user2 )",
            {
                id: payload.chatid,
                user1: payload.user,
                user2: payload.user,
            }
        ).execute()
    }

    remove(id: any): Promise<any> {
        return this.messagesRepository.delete(id);

    }

}