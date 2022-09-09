import { UsersService } from "./users.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    findByNumber(req: any): Promise<{
        id: number;
    }>;
}
