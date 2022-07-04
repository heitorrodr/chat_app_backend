import { Injectable, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Call } from "./call.entity";

@Injectable()
export class CallService {

    constructor(@InjectRepository(Call) private callsRepository: Repository<Call>) { }

    createCall(payload: any){
        this.callsRepository.insert({
            sender_id: payload.sender_id,
            receiver_id: payload.receiver_id
        })
    }

    listAll(payload: any) {
        return this.callsRepository.find({
            where: {
                sender_id: payload.id,
                receiver_id: payload.id
            }
        })
    }

    remove(payload: any): Promise<any> {
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