import { Controller, Post, UseGuards, Request, Get, Param, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ChatService } from "./chat.service";

@Controller()

export class ChatController {

    constructor(private chatService: ChatService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post("/chat/create")
    createMessage(@Request() req: any) {
        return this.chatService.create({
            message: req.body.message,
            user1: req.user.id,
            user2: req.body.id,
            is_status: req.body.is_status,
            media: req.body.media,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/chat/delete/:id")
    deleteMessages(@Request() req: any, @Param() params: any) {
        return this.chatService.remove({
            user: req.user.id,
            chatid: params.id
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/chat/list")
    listMessages(@Request() req: any) {
        console.log(req.body)
        return this.chatService.listAll({ user1: req.user.id, user2: req.body.id, is_status: req.body.is_status });
    }

}