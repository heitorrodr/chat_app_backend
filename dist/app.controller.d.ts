import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly appService;
    private authService;
    private userService;
    constructor(appService: AppService, authService: AuthService, userService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    getUserNumber(req: any): Promise<string>;
    create(req: any): Promise<any>;
    remove(req: any): Promise<any>;
}
