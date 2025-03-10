import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'shared-sdk';

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }
}
