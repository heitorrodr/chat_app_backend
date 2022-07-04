import { Controller, Post, UseGuards, Request, Get, Param} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessageService } from "./message.service"

@Controller()
export class MessageController {
    constructor(private messageService: MessageService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post("/message/send/:chatid")
    sendMessage(@Request() req, @Param() param) {
        return this.messageService.sendMessage({
            content: req.body.content,
            user_id: req.user.id,
            chat_id: param.chatid
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/message/listchat/:id")
    listMessages(@Request() req, @Param() param) {
        return this.messageService.find({
            user: req.user.id,
            chatid: req.body.chatid
        });
    }
}