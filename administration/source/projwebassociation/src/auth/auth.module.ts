import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule, 
        PassportModule,
        JwtModule.register({
                  secret: jwtConstants.secret,
                  signOptions: { expiresIn: jwtConstants.TOKEN_DURATION +'s' },
                })
    ],
    providers: [AuthService, LocalStrategy,JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
