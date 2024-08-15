import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './auth/common/strategies';
import { PassportModule } from '@nestjs/passport';
import { OtpModule } from './otp/otp.module';
import { WalletModule } from './wallet/wallet.module';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';
import { CurrentorderModule } from './currentorder/currentorder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),

    JwtModule.register({
      global: true,
    }),

    PassportModule,
    AdminModule,
    UserModule,
    DriverModule,
    OrderModule,
    AuthModule,
    OtpModule,
    WalletModule,
    RefreshtokenModule,
    CurrentorderModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    AccessTokenStrategy
  ],
})
export class AppModule { }
