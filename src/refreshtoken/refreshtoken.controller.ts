import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';
import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';
import { UpdateRefreshtokenDto } from './dto/update-refreshtoken.dto';

@Controller('refreshtoken')
export class RefreshtokenController {
  constructor(private readonly refreshtokenService: RefreshtokenService) {}

  @Post()
  create(@Body() createRefreshtokenDto: CreateRefreshtokenDto) {
    return this.refreshtokenService.create(createRefreshtokenDto);
  }

  @Get()
  findAll() {
    return this.refreshtokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refreshtokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefreshtokenDto: UpdateRefreshtokenDto) {
    return this.refreshtokenService.update(+id, updateRefreshtokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refreshtokenService.remove(+id);
  }
}
