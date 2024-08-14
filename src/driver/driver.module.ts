import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { PrismaService } from 'prisma/prisma.service';
import { RefreshtokenService } from 'src/refreshtoken/refreshtoken.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService, PrismaService, RefreshtokenService],
})
export class DriverModule { }
