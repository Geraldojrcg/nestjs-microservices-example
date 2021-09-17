import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/config/mailer.config';

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  providers: [SenderService],
  exports: [SenderService],
})
export class SenderModule {}
