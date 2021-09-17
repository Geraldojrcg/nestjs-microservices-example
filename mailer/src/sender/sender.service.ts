import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Contact } from '.prisma/client';

@Injectable()
export class SenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeMail(contact: Contact) {
    await this.mailerService.sendMail({
      to: contact.email,
      subject: 'Testing ✔',
      text: 'Welcome',
      html: `<b>Welcome ${contact.name}</b>`,
    });
  }
}
