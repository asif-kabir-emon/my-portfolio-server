import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtGuard } from 'src/auth/guard/auth.guard';
import { AddContactDto } from './dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addContact(@Body() dto: AddContactDto) {
    return this.contactService.addContact(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getContact() {
    return this.contactService.getContact();
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  async updateContact(@Body() dto: AddContactDto) {
    return this.contactService.updateContact(dto);
  }
}
