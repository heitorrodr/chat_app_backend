import { MessageService } from "./message.service";
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    sendMessage(req: any, param: any): Promise<any>;
    listMessages(req: any, param: any): Promise<any>;
}
