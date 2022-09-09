import { ChatService } from "./chat.service";
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    createMessage(req: any): Promise<import("typeorm").InsertResult>;
    deleteMessages(req: any, params: any): Promise<any>;
    listMessages(req: any): Promise<any>;
}
