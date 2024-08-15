import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CurrentorderService } from './currentorder.service';
import { CreateCurrentorderDto } from './dto/create-currentorder.dto';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { RolesGuard } from 'src/auth/common/guards/role.guard';
import { Roles } from 'src/auth/common/decorators/role.decorator';
import { Role } from 'src/auth/common/types/role.enum';




@Controller('currentorder')
export class CurrentorderController {
  constructor(
    private readonly currentorderService: CurrentorderService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  create(@Req() req, @Body() createCurrentorderDto: CreateCurrentorderDto) {
    return this.currentorderService.create(createCurrentorderDto, req);
  }

  @Get()
  findAll() {
    return this.currentorderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currentorderService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currentorderService.remove(id);
  }
}
