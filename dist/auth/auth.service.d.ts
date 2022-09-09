import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    createUser(user_: any): Promise<any>;
    remove(idJwt: any, idReq: any): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
