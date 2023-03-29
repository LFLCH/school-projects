import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersServiceService } from 'src/users/users.service.service';
import { AuthInput } from './auth.controller';

@Injectable()
export class AuthService {

    constructor(private userService : UsersServiceService, private jwtService : JwtService){
    }

    public async validateUser(id: number, password: string) : Promise<User> {
        try {
          const user = await this.userService.getSpecificUser(id);
          const vu : boolean= await this.userService.isValidPassword(user,password)
          return vu?user:undefined;
        }
        catch (error){
          throw error;
        }
      }
    
      async login(user: AuthInput) {
        const payload = { username: user.username };
        const token : string = this.jwtService.sign(payload);
        return {
            access_token: token,
            user_id:+user.username
        };
    }
}
