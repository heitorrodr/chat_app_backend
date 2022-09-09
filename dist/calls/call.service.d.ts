import { Chat } from "src/chats/chats.entity";
import { Repository } from "typeorm";
import { Call } from "./call.entity";
export declare class CallService {
    private callsRepository;
    private chatRepository;
    constructor(callsRepository: Repository<Call>, chatRepository: Repository<Chat>);
    createCall(payload: any): Promise<void>;
    listAll(payload: {
        id: number;
        is_message: any;
    }): Promise<any>;
    removeReceiverCall(payload: {
        user: number;
        is_message: any;
    }): Promise<any>;
    removeReceiverChat(payload: {
        user: number;
        is_message: any;
    }): Promise<any>;
    removeReceiverStatus(payload: {
        user: number;
        is_message: any;
    }): Promise<any>;
    remove(payload: {
        callid: number;
        user: number;
    }): Promise<any>;
}
