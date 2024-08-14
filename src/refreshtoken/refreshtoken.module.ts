import { Module } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';
import { RefreshtokenController } from './refreshtoken.controller';

@Module({
  controllers: [RefreshtokenController],
  providers: [RefreshtokenService],
})
export class RefreshtokenModule {}
