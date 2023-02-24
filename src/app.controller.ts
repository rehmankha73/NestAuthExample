import { Controller, Request, Post, UseGuards, Get, Query } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { Public } from "./auth/decorators/setmetadata.decorator";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./common/schemas/users.schema";
import { Model } from "mongoose";

@Controller()
export class AppController {
  constructor(private authService: AuthService, @InjectModel(User.name) private readonly model: Model<UserDocument>) {}

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
  @Get('user')
  async create(@Query() data) {
    console.log('Data', data)
    return {
      name: 'rehman ahmed khan'
    }
    // const user = this.model.create({
    //
    // });
    // return req.user;
  }



  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}