import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Message de bienvenue' })
  getHello(): string {
    return this.appService.getHello();
  }
}
