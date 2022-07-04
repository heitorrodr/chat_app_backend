import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chats/chats.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
@Module({
    imports: [TypeOrmModule.forFeature([Chat]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' }
      })
    ],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [TypeOrmModule]
})

export class ChatModule { }
