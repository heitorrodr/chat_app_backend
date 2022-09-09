import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chats/chats.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { Call } from './call.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Call]),
    TypeOrmModule.forFeature([Chat]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' }
    })
    ],
    providers: [CallService],
    controllers: [CallController],
    exports: [TypeOrmModule]
})

export class CallModule { }
