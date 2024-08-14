import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { RefreshtokenService } from 'src/refreshtoken/refreshtoken.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule { }
