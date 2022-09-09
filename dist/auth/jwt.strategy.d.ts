import { Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        id: number;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        messages: import("../messages/message.entity").Message[];
    }>;
}
export {};
