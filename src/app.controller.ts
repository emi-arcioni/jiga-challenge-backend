import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getNews(@Query('query') query): Promise<string[]> {
    return await this.appService.getNews(query);
  }
}
