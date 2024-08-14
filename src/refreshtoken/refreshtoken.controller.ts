import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';


@Controller('refreshtoken')
export class RefreshtokenController {
  constructor(private readonly refreshtokenService: RefreshtokenService) { }


  @Get()
  findAll() {
    try {
      return this.refreshtokenService.findAll();
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refreshtokenService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refreshtokenService.remove(+id);
  }
}
