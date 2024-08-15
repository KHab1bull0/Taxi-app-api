import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { RolesGuard } from 'src/auth/common/guards/role.guard';
import { Roles } from 'src/auth/common/decorators/role.decorator';
import { Role } from 'src/auth/common/types/role.enum';


@Controller('refreshtoken')
export class RefreshtokenController {
  constructor(private readonly refreshtokenService: RefreshtokenService) { }


  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    try {
      return this.refreshtokenService.findAll();
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.refreshtokenService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.refreshtokenService.remove(id);
  }
}
