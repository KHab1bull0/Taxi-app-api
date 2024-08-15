import { Module } from '@nestjs/common';
import { CurrentorderService } from './currentorder.service';
import { CurrentorderController } from './currentorder.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CurrentorderController],
  providers: [CurrentorderService, PrismaService],
})
export class CurrentorderModule {}
