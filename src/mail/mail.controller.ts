import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async sendMail(
    @Body('from') from: string,
    @Body('name') name: string,
    @Body('message') message: string,
  ) {
    return this.mailService.sendMail(from, name, message);
  }
}
