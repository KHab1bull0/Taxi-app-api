import { Module } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';
import { RefreshtokenController } from './refreshtoken.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RefreshtokenController],
  providers: [RefreshtokenService, PrismaService],
})
export class RefreshtokenModule {}
