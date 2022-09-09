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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chats_entity_1 = require("../chats/chats.entity");
let ChatService = class ChatService {
    constructor(chatsRepository) {
        this.chatsRepository = chatsRepository;
    }
    create(payload) {
        if (typeof payload.media !== 'undefined') {
            if (payload.media['type'] === 'photo') {
                return this.chatsRepository.insert({
                    message: payload.message,
                    user1: payload.user1,
                    user2: payload.user2,
                    isStatus: payload.is_status,
                    photo: payload.media.photo,
                });
            }
            if (payload.media['type'] === 'video') {
                return this.chatsRepository.insert({
                    message: payload.message,
                    user1: payload.user1,
                    user2: payload.user2,
                    video: payload.media.video,
                    isStatus: payload.is_status,
                });
            }
            if (payload.media['type'] === 'audio') {
                return this.chatsRepository.insert({
                    message: payload.message,
                    user1: payload.user1,
                    user2: payload.user2,
                    audio: payload.media.audio,
                    isStatus: payload.is_status,
                });
            }
        }
        else {
            return this.chatsRepository.insert({
                message: payload.message,
                user1: payload.user1,
                user2: payload.user2,
                isStatus: payload.is_status,
            });
        }
    }
    remove(payload) {
        return this.chatsRepository.createQueryBuilder().delete().where("id = :id AND ( user1 = :user1 OR user2 = :user2 )", {
            id: payload.chatid,
            user1: payload.user,
            user2: payload.user,
        }).execute();
    }
    listAll(payload) {
        let result = this.chatsRepository.createQueryBuilder().
            where("user1 = :user1 AND user2 = :user2 AND is_status = :is_status", {
            user2: payload.user1,
            user1: payload.user2,
            is_status: payload.is_status,
        }).execute();
        this.removeReceiver({
            user2: payload.user1,
            user1: payload.user2,
            is_status: payload.is_status,
        });
        return result;
    }
    removeReceiver(payload) {
        return this.chatsRepository.createQueryBuilder().delete().where("user1 = :user1 AND user2 =:user2 AND is_status = :is_status", {
            user1: payload.user1,
            user2: payload.user2,
            is_status: payload.is_status
        }).execute();
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chats_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map