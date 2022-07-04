import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { MessageController } from './message/message.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Message } from './messages/message.entity';
import { Chat } from './chats/chats.entity';
import { Call } from './calls/call.entity';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { ChatModule } from './chat/chat.module'
import { CallModule } from './calls/call.module';

@Module({
  imports: [AuthModule, CallModule, UsersModule, ChatModule, MessageModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'HowSheGaveMeLife3$',
    database: 'test',
    entities: [User, Chat, Message, Call],
    synchronize: true,
    logging: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
