import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "src/chats/chats.entity";

@Injectable()
export class ChatService {

    constructor(@InjectRepository(Chat) private chatsRepository: Repository<Chat>) { }

    create(payload: any) {
        if (typeof payload.media !== 'undefined') {

            if (payload.media['type'] === 'photo') {
                return this.chatsRepository.insert({
                    message: payload.message,
                    user1: payload.user1,
                    user2: payload.user2,
                    isStatus: payload.is_status,
                    photo: payload.media.photo,
                })
            }
            if (payload.media['type'] === 'video') {
                return this.chatsRepository.insert({
                    message: payload.message,
                    user1: payload.user1,
                    user2: payload.user2,
                    video: payload.media.video,
                    isStatus: payload.is_status,
                })
            }
            if (payload.media['type'] === 'audio') {
                return this.chatsRepository.insert({
                    message: payload.message,
                    user1: payload.user1,
                    user2: payload.user2,
                    audio: payload.media.audio,
                    isStatus: payload.is_status,
                })
            }

        } else {
            return this.chatsRepository.insert({
                message: payload.message,
                user1: payload.user1,
                user2: payload.user2,
                isStatus: payload.is_status,
            })
        }
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


    listAll(payload) {
        let result = this.chatsRepository.createQueryBuilder().
            where("user1 = :user1 AND user2 = :user2 AND is_status = :is_status", {
                user2: payload.user1,
                user1: payload.user2,
                is_status: payload.is_status,
            }).execute();

        this.removeReceiver(
            {
                user2: payload.user1,
                user1: payload.user2,
                is_status: payload.is_status,
            }
        )
        return result;
    }


    removeReceiver(payload): Promise<any> {
        return this.chatsRepository.createQueryBuilder().delete().where(
            "user1 = :user1 AND user2 =:user2 AND is_status = :is_status",
            {
                user1: payload.user1,
                user2: payload.user2,
                is_status: payload.is_status
            }
        ).execute()

    }

}