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
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chats_entity_1 = require("../chats/chats.entity");
const typeorm_2 = require("typeorm");
const call_entity_1 = require("./call.entity");
let CallService = class CallService {
    constructor(callsRepository, chatRepository) {
        this.callsRepository = callsRepository;
        this.chatRepository = chatRepository;
    }
    async createCall(payload) {
        let result = await this.callsRepository.createQueryBuilder().
            where("sender_id = :sender_id AND receiver_id = :receiver_id AND is_message = :is_message", {
            sender_id: payload.sender_id,
            receiver_id: payload.receiver_id,
            is_message: payload.is_message
        }).execute();
        if (result == 0) {
            this.callsRepository.insert({
                senderId: payload.sender_id,
                receiverId: payload.receiver_id,
                isMessage: payload.is_message
            });
        }
        else {
        }
    }
    listAll(payload) {
        let result = this.callsRepository.createQueryBuilder().
            where("receiver_id = :receiver_id AND is_message = :is_message", {
            receiver_id: payload.id,
            is_message: payload.is_message,
        }).execute();
        if (payload.is_message == 0) {
            this.removeReceiverCall({
                user: payload.id,
                is_message: payload.is_message
            });
        }
        else if (payload.is_message == 1) {
            this.removeReceiverChat({
                user: payload.id,
                is_message: payload.is_message
            });
        }
        else if (payload.is_message == 2) {
            this.removeReceiverStatus({
                user: payload.id,
                is_message: payload.is_message
            });
        }
        return result;
    }
    removeReceiverCall(payload) {
        return this.callsRepository.createQueryBuilder().delete().where("receiver_id = :id AND is_message = 0", {
            id: payload.user,
        }).execute();
    }
    removeReceiverChat(payload) {
        console.log(payload.is_message);
        return this.callsRepository.createQueryBuilder().delete().where("receiver_id = :id AND is_message = 1", {
            id: payload.user,
        }).execute();
    }
    removeReceiverStatus(payload) {
        return this.callsRepository.createQueryBuilder().delete().where("receiver_id = :id AND is_message = 2", {
            id: payload.user,
        }).execute();
    }
    remove(payload) {
        return this.callsRepository.createQueryBuilder().delete().where("id = :id AND ( sender_id = :user1 OR receiver_id = :user2 )", {
            id: payload.callid,
            user1: payload.user,
            user2: payload.user,
        }).execute();
    }
};
CallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(call_entity_1.Call)),
    __param(1, (0, typeorm_1.InjectRepository)(chats_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CallService);
exports.CallService = CallService;
//# sourceMappingURL=call.service.js.map