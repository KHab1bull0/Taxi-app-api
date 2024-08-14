import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HelperModule } from 'src/helper/helper.module';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/helper/mail.service';
import { OtpService } from 'src/helper/otp.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './common/strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HelperModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService,
    MailService, 
    OtpService, 
    JwtService,
  ],
})
export class AuthModule {}
