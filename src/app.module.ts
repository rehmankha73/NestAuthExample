import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "./common/schemas/users.schema";

@Module({
  imports: [AuthModule, UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:crMv8H7p3UQKqFLz@cluster0.qzl8j9c.mongodb.net/auth-example--db?retryWrites=true&w=majority'
    ),
    MongooseModule.forFeature([ { name: User.name, schema: userSchema } ]),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}