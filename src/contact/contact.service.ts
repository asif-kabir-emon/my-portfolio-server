import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddContactDto, EditContactDto } from './dto';

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async addContact(dto: AddContactDto) {
    const contactData = this.prisma.contact.create({
      data: {
        ...dto,
      },
    });

    return contactData;
  }

  async getContact() {
    return this.prisma.contact.findFirst();
  }

  async updateContact(dto: EditContactDto) {
    let result: any = null;
    const contactData = await this.prisma.contact.findFirst();

    if (contactData) {
      result = this.prisma.contact.update({
        where: {
          id: contactData.id,
        },
        data: {
          ...dto,
        },
      });
    } else {
      result = this.prisma.contact.create({
        data: dto,
      });
    }

    return result;
  }
}
