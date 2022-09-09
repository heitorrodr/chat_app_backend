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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ws_guard_1 = require("./ws.guard");
const auth_service_1 = require("../auth/auth.service");
let ChatGateway = class ChatGateway {
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
    handleJoinRoom(client, room, user) {
        let auth_token = client.handshake.headers.authorization;
        console.log(auth_token);
        console.log(user);
        client.join(room);
        client.emit('joinedRoom', room);
    }
    handleLeftRoom(client, room) {
        client.leave(room);
        client.emit('leftRoom', room);
    }
    handleNewUser(client, id) {
        console.log(id);
        if (typeof id === 'object')
            client.broadcast.emit('userJoined', id);
    }
    handleStream(client, id) {
        client.broadcast.emit('userJoined', id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('chatToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __param(2, (0, ws_guard_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeftRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("newUser"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleNewUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("stream-data"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleStream", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        allowEIO3: true
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map