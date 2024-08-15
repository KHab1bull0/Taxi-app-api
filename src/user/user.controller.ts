import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { Role } from 'src/auth/common/types/role.enum';
import { Roles } from 'src/auth/common/decorators/role.decorator';
import { RolesGuard } from 'src/auth/common/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("all")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }


  @Get('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  async addComment(@Param('id') id: string, @Body() body: CommentDto) {
    return this.userService.addComment(id, body);
  }
}
