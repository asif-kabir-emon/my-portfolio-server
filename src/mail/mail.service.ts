import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAILER_HOST'),
      port: this.config.get('MAILER_PORT'),
      secure: false,
      auth: {
        user: this.config.get('MAILER_USER'),
        pass: this.config.get('MAILER_PASS'),
      },
    });
  }

  async sendMail(from: string, name: string, message: string) {
    const mailOptions = {
      from: from,
      to: this.config.get('MAILER_USER'),
      subject: name + ' want to contact with You',
      text: `From: ${from}\nName: ${name}\n\n${message}`,
      html: message,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return {
        send: true,
        message: 'Message sent: ' + info.messageId,
      };
    } catch (error) {
      return {
        send: false,
        message: error.message,
      };
    }
  }
}
