import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { Observable } from "rxjs";
import { jwtConstants } from "src/auth/constants";
import { createParamDecorator } from "@nestjs/common";

@Injectable()
export class WsGuard implements CanActivate {

    constructor(private jwt: JwtService, private usersService: UsersService) { }

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
        const req = context.switchToWs().getClient();

        try {
            const decoded = this.jwt.verify(bearerToken, jwtConstants) as any;
            return new Promise((resolve, reject) => {
                return this.usersService.findOne(decoded.username).then(user => {
                    if (user) {
                        req.handshake.headers.data = user;
                        resolve(user);
                    } else {
                        reject(false);
                    }
                });

            });
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToWs().getClient()
        return req.handshake.headers.data;
    },
);