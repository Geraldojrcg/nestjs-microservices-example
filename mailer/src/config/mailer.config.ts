import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'lou.davis31@ethereal.email',
      pass: 'yqBFNr642YT3MGVdwz',
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
};
