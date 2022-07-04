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

    async remove(id: string): Promise<any> {
        return await this.usersRepository.delete(id);
    }
    
    async create(payload: any) : Promise<any>{
        return this.usersRepository.insert({
            firstName: payload.firstName,
            lastName: payload.lastName,
            username: payload.username,
            password: payload.password,
            email: payload.email,
        });
    }
}
