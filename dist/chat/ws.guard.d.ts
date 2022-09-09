import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { Observable } from "rxjs";
export declare class WsGuard implements CanActivate {
    private jwt;
    private usersService;
    constructor(jwt: JwtService, usersService: UsersService);
    canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any>;
}
export declare const User: (...dataOrPipes: unknown[]) => ParameterDecorator;
