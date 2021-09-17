import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { SenderModule } from 'src/sender/sender.module';

@Module({
  imports: [SenderModule],
  controllers: [ContactsController],
  providers: [PrismaService, ContactsService],
})
export class ContactsModule {}
