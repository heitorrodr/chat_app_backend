import { Controller, Request, Post, Get, UseGuards, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) { }
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any) {
    console.log(req)
    return req.user;
  }

  @Post('auth/signup')
  create(@Request() req: any) {
    return this.authService.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('auth/remove')
  remove(@Request() req: any) {
    return this.authService.remove(req.user.id, req.body.id);
  }
}
