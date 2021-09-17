import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ContactsModule } from './contacts/contacts.module';
import { SenderModule } from './sender/sender.module';

@Module({
  imports: [ContactsModule, SenderModule],
  providers: [PrismaService],
})
export class AppModule {}
