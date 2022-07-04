import { Controller, Post, UseGuards, Request, Get, Param, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ChatService } from "./chat.service"

@Controller()
export class ChatController {
    constructor(private chatService: ChatService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post("/chat/create")
    createMessage(@Request() req) {
        return this.chatService.create({
            user1: req.user.id,
            user2: req.body.id,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/chat/delete/:id")
    deleteMessages(@Request() req, @Param() params) {
        return this.chatService.remove({
            user: req.user.id,
            chatid: params.id
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/chat/list")
    listMessages(@Request() req) {
        return this.chatService.listAll({ id: req.user.id });
    }

}