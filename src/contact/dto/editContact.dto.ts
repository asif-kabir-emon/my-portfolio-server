import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditContactDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsString()
  @Optional()
  phoneNumber?: string;

  @IsString()
  @Optional()
  whatsAppNumber?: string;

  @IsString()
  @Optional()
  telegramUsername?: string;

  @IsString()
  @Optional()
  contactAddress?: string;

  @IsString()
  @Optional()
  githubUsername?: string;

  @IsString()
  @Optional()
  linkedinUsername?: string;

  @IsString()
  @Optional()
  twitterUsername?: string;
}
