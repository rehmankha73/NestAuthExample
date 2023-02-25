import { Injectable } from '@nestjs/common';
import { UsersService } from "./users/users.service";

@Injectable()
export class AppService {

  constructor(private readonly userService: UsersService) {}

  index() {
    return 'Hey, Good to see you! remember hard work pays off!'
  }

  getAllUsers() {
    return this.userService.fetchAll();
  }
}
