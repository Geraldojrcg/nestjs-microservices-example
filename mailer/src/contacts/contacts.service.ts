import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SenderService } from 'src/sender/sender.service';

@Injectable()
export class ContactsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly senderService: SenderService,
  ) {}

  async create(data: Prisma.ContactCreateInput) {
    const contact = await this.prismaService.contact.create({ data: data });
    await this.senderService.sendWelcomeMail(contact);
  }

  async update(id: number, data: Prisma.ContactUpdateInput) {
    await this.prismaService.contact.update({
      where: {
        monilith_user_id: id,
      },
      data: data,
    });
  }

  async remove(id: number) {
    await this.prismaService.contact.delete({
      where: {
        monilith_user_id: id,
      },
    });
  }
}
