import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chats/chats.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Chat]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' }
      })
    ],
    providers: [ChatService, ChatGateway, JwtService, AuthService, UsersService],
    controllers: [ChatController],
    exports: [TypeOrmModule]
})

export class ChatModule { }
