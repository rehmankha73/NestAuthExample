import { Controller, Request, Post, UseGuards, Get, Query } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { Public } from "./auth/decorators/setmetadata.decorator";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./common/schemas/users.schema";
import { Model } from "mongoose";
import { UsersService } from "./users/users.service";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService, @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private readonly userService: UsersService,
    private readonly appService: AppService
  ) {}


  @Public()
  @Get()
  index() {
    return this.appService.index()
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('request', req)
    return this.authService.login(req.user);
    // return req.user;
  }

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Get('users')
  async fetchAll(@Query() data) {
    return this.appService.getAllUsers();
    // return this.userService.fetchAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}