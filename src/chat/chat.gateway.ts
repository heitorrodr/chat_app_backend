import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards, Request } from '@nestjs/common';
import { WsGuard, User } from './ws.guard';
import { AuthService } from 'src/auth/auth.service';
import { Interface } from 'readline';


@WebSocketGateway({
    cors: {
        origin: '*',
    },
    allowEIO3: true
})

//@UseGuards(WsGuard)

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer()
    wss: Server;


    private logger: Logger = new Logger('ChatGateway');

    constructor(private authService: AuthService) { }

    handleConnection(client: any, ...args: any[]) {

    }

    handleDisconnect(client: any) {

    }

    afterInit(server: any) {

    }


    @SubscribeMessage('chatToServer')
    handleChatMessage(client: Socket, payload: { sender: string, room: string, message: string }) {
        
        this.logger.log(payload);

        payload.sender = 'close your fucking eyes'
        this.wss.to(payload.room).emit('chatToClient', payload);
    }


    @SubscribeMessage('joinRoom')
    handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string, @User() user: any) {

        let auth_token = client.handshake.headers.authorization;
        console.log(auth_token);
        console.log(user);
        client.join(room);
        client.emit('joinedRoom', room);
    }

    @SubscribeMessage('leaveRoom')
    handleLeftRoom(client: Socket, room: string) {
        client.leave(room);
        client.emit('leftRoom', room);
    }

    @SubscribeMessage("newUser")
    handleNewUser(client: Socket, id: any) {
        console.log(id);
        if (typeof id === 'object')
            client.broadcast.emit('userJoined', id);
    }

    @SubscribeMessage("stream-data")
    handleStream(client: Socket, id: any) {

        client.broadcast.emit('userJoined', id);
    }

}