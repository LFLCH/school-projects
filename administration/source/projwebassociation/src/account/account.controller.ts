import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';

export class ChangePasswordInput {
    @ApiProperty({
        description: "Token de l'utilisateur",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        type: String
    })
    public token: string
    @ApiProperty({
        description: "Nouveau mot de passe de l'utilisateur",
        type: String
    })
    public new_password: string
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@ApiTags('account')
@Controller('account')
export class AccountController {

    constructor(
        private accountService: AccountService
    ) { }

    @Post('password')
    @ApiOperation({ summary: 'Changer de mot de passe' })
    @ApiCreatedResponse({
        description: 'The password has been successfully changed.'
    })
    async password(@Body() input: ChangePasswordInput) {
        return await this.accountService.password(input.token, input.new_password)
    }
}


