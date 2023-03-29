import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';

export class AuthInput {
  @ApiProperty({
    description: "Numéro d'identification",
    default: '1',
    type: String,
})
  public username : string;
  @ApiProperty({
    description:"Mot de passe",
    default : "valid_password",
    type:String
  })
  public password :string
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() auth : AuthInput) {
      return this.authService.login(auth);
    }
}