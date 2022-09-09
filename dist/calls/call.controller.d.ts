import { CallService } from "./call.service";
export declare class CallController {
    private callService;
    constructor(callService: CallService);
    createCall(req: any): Promise<void>;
    listAll(req: any): Promise<any>;
    deleteCall(req: any, params: any): Promise<any>;
}
