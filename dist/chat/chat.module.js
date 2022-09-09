"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const typeorm_1 = require("@nestjs/typeorm");
const chats_entity_1 = require("../chats/chats.entity");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../auth/constants");
const chat_gateway_1 = require("./chat.gateway");
const jwt_2 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, typeorm_1.TypeOrmModule.forFeature([chats_entity_1.Chat]),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' }
            })
        ],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway, jwt_2.JwtService, auth_service_1.AuthService, users_service_1.UsersService],
        controllers: [chat_controller_1.ChatController],
        exports: [typeorm_1.TypeOrmModule]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map