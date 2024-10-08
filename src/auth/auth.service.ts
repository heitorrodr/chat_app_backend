import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    
    createUser(user_: any) : Promise<any>{
        const user = this.usersService.create({
            username: user_.username,
            email: user_.email,
            password: user_.password,
            firstName: user_.firstName,
            lastName: user_.lastName,
            isActive: false,
        });
        const {...result} = user;
        return result;
    }
    remove(idJwt: any, idReq: any) : Promise<any> {
        if(idJwt == idReq){
            return this.usersService.remove(idJwt);
        }
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
