import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "src/chats/chats.entity";

@Injectable()
export class ChatService {

    constructor(@InjectRepository(Chat) private chatsRepository: Repository<Chat>) { }

    create(payload: any) {
        return this.chatsRepository.insert({
            user1: payload.user1,
            user2: payload.user2,
        })
    }

    remove(payload: any): Promise<any> {
        return this.chatsRepository.createQueryBuilder().delete().where(
            "id = :id AND ( user1 = :user1 OR user2 = :user2 )",
            {
                id: payload.chatid,
                user1: payload.user,
                user2: payload.user,
            }
        ).execute()

    }

    listAll(payload: any) {
        return this.chatsRepository.find({
            where: {
                user1: payload.id,
                user2: payload.id,
            }
        })
    }

}