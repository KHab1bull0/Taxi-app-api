import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { OrderModule } from './order/order.module';
import { RatingModule } from './rating/rating.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './auth/common/strategies';
import { PassportModule } from '@nestjs/passport';

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
    RatingModule, 
    AuthModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    AccessTokenStrategy
  ],
})
export class AppModule { }
