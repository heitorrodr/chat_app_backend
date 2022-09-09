import { Controller, Post, UseGuards, Request, Get, Delete, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CallService } from "./call.service"

@Controller()
export class CallController {
    constructor(private callService: CallService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('/call/create')
    createCall(@Request() req) {
        console.log(req.body.receiver_id)
        return this.callService.createCall({
            sender_id: req.user.id,
            receiver_id: req.body.receiver_id,
            is_message: req.body.is_message,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/call/list')
    listAll(@Request() req) {
        return this.callService.listAll({ id: req.user.id, is_message: req.body.is_message })
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete("/call/delete/:id")
    deleteCall(@Request() req, @Param() params) {
        return this.callService.remove({
            user: req.user.id,
            callid: params.id
        });
    }

}