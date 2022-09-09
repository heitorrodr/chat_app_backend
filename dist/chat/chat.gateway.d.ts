import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private authService;
    wss: Server;
    private logger;
    constructor(authService: AuthService);
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    afterInit(server: any): void;
    handleChatMessage(client: Socket, payload: {
        sender: string;
        room: string;
        message: string;
    }): void;
    handleJoinRoom(client: Socket, room: string, user: any): void;
    handleLeftRoom(client: Socket, room: string): void;
    handleNewUser(client: Socket, id: any): void;
    handleStream(client: Socket, id: any): void;
}
