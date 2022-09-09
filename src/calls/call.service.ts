import { Injectable, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/chats/chats.entity";
import { Repository } from "typeorm";
import { Call } from "./call.entity";

@Injectable()
export class CallService {

    constructor(@InjectRepository(Call) private callsRepository: Repository<Call>,
        @InjectRepository(Chat) private chatRepository: Repository<Chat>) { }

    async createCall(payload: any) { /* adicionar um parâmetro de quantas mensagens há! */
        let result = await this.callsRepository.createQueryBuilder().
            where("sender_id = :sender_id AND receiver_id = :receiver_id AND is_message = :is_message", {
                sender_id: payload.sender_id,
                receiver_id: payload.receiver_id,
                is_message: payload.is_message
            }).execute();
        if (result == 0) {
            this.callsRepository.insert({
                senderId: payload.sender_id,
                receiverId: payload.receiver_id,
                isMessage: payload.is_message
            })
        } else {
            /* ---- increase counter ---- */
        }
    }

    listAll(payload: { id: number, is_message: any }) {



        let result = this.callsRepository.createQueryBuilder().
            where("receiver_id = :receiver_id AND is_message = :is_message", {

                receiver_id: payload.id,
                is_message: payload.is_message,

            }).execute();

        if (payload.is_message == 0) {
            this.removeReceiverCall(
                {
                    user: payload.id,
                    is_message: payload.is_message
                });
        } else if (payload.is_message == 1) {
            this.removeReceiverChat(
                {
                    user: payload.id,
                    is_message: payload.is_message
                });
        } else if (payload.is_message == 2) {
            this.removeReceiverStatus(
                {
                    user: payload.id,
                    is_message: payload.is_message
                });
        }

        return result;
    }

    removeReceiverCall(payload: { user: number, is_message: any }): Promise<any> {

        return this.callsRepository.createQueryBuilder().delete().where(
            "receiver_id = :id AND is_message = 0",
            {
                id: payload.user,
            }
        ).execute();
    }

    removeReceiverChat(payload: { user: number, is_message: any }): Promise<any> {
        console.log(payload.is_message);
        return this.callsRepository.createQueryBuilder().delete().where(
            "receiver_id = :id AND is_message = 1", {
            id: payload.user,
        }
        ).execute();
    }

    removeReceiverStatus(payload: { user: number, is_message: any }): Promise<any> {
        return this.callsRepository.createQueryBuilder().delete().where(
            "receiver_id = :id AND is_message = 2", {
            id: payload.user,
        }
        ).execute();
    }


    remove(payload: { callid: number, user: number }): Promise<any> {
        return this.callsRepository.createQueryBuilder().delete().where(
            "id = :id AND ( sender_id = :user1 OR receiver_id = :user2 )",
            {
                id: payload.callid,
                user1: payload.user,
                user2: payload.user,
            }
        ).execute()

    }


}