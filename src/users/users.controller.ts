import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";

@Controller()
export class UserController{
    constructor(private readonly userService : UsersService ){}
    
    @UseGuards(AuthGuard('jwt'))
    @Post('/user/find_by_number')
    async findByNumber(@Req() req){
        let data  = await this.userService.findOne(req.body.number);
        let returned = {
            id: data.id
        }
        return returned;
    }
    
}