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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ws_guard_1 = require("./ws.guard");
const auth_service_1 = require("./auth/auth.service");
let AppGateway = class AppGateway {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('ChatGateway');
    }
    handleConnection(client, ...args) {
    }
    handleDisconnect(client) {
    }
    afterInit(server) {
    }
    handleChatMessage(client, payload) {
        this.logger.log(payload);
        payload.sender = 'close your fucking eyes';
        this.wss.to(payload.room).emit('chatToClient', payload);
    }
    handleJoinRoom(client, room) {
        let auth_token = client.handshake.headers.authorization;
        console.log(auth_token);
        client.join(room);
        client.emit('joinedRoom', room);
    }
    handleLeftRoom(client, room) {
        client.leave(room);
        client.emit('leftRoom', room);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "wss", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('chatToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleChatMessage", null);
__decorate([
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleLeftRoom", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map