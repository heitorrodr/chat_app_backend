import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/message.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
    imports: [TypeOrmModule.forFeature([Message]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' }
      })
    ],
    providers: [MessageService],
    controllers: [MessageController],
    exports: [TypeOrmModule]
})

export class MessageModule { }
