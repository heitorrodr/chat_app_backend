import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<User>;
    findById(id: number): Promise<string>;
    remove(id: string): Promise<any>;
    create(payload: any): Promise<any>;
}
