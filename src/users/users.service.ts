import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(username: string): Promise<User> {
        return this.usersRepository.findOneBy({ username });
    }

    async findById(id: number): Promise<string> {
        const { username } = await this.usersRepository.findOneBy({ id });
        return username;
    }

    async remove(id: string): Promise<any> {
        return await this.usersRepository.delete(id);
    }

    async create(payload: any): Promise<any> {
        let username: string = payload.username;
        let data = await this.findOne(username)
        if (!data) {
            return this.usersRepository.insert({
                username: payload.username,
                password: payload.password,
            });
        } else {
            return data;
        }

    }
}
