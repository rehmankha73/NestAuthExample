import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../common/schemas/users.schema";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string){
    return this.users.find(user => user.username === username);
  }
}