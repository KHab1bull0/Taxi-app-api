import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { OtpService } from './otp.service';
import { HashService } from './hash.service';

@Module({
    providers: [MailService, OtpService, HashService],
    exports: [MailService, OtpService, HashService],
})
export class HelperModule { }
