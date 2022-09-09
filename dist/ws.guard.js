"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("./users/users.service");
const constants_1 = require("./auth/constants");
let WsGuard = class WsGuard {
    constructor(jwt, usersService) {
        this.jwt = jwt;
        this.usersService = usersService;
    }
    canActivate(context) {
        const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
        console.log(bearerToken);
        try {
            const decoded = this.jwt.verify(bearerToken, constants_1.jwtConstants);
            return new Promise((resolve, reject) => {
                return this.usersService.findOne(decoded.username).then(user => {
                    if (user) {
                        resolve(user);
                    }
                    else {
                        reject(false);
                    }
                });
            });
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    }
};
WsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, users_service_1.UsersService])
], WsGuard);
exports.WsGuard = WsGuard;
//# sourceMappingURL=ws.guard.js.map