import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { RolesGuard } from 'src/auth/common/guards/role.guard';
import { Roles } from 'src/auth/common/decorators/role.decorator';
import { Role } from 'src/auth/common/types/role.enum';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) { }

  @Get("all")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.otpService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  removebyId(@Param('id') id: string) {
    return this.otpService.removebyId(id);
  }

}
