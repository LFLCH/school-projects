import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { UsersServiceService } from "src/users/users.service.service";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
    controllers: [AccountController],
    providers: [AccountService,JwtService,AuthService],
    imports: [UsersModule],
  })
  export class AccountModule {}