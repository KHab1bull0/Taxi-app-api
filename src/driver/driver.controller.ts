import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { Roles } from 'src/auth/common/decorators/role.decorator';
import { Role } from 'src/auth/common/types/role.enum';
import { RolesGuard } from 'src/auth/common/guards/role.guard';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get("all")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  findAll() {
    return this.driverService.findAll();
  }


  @Get('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id);
  }

  @Patch('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateDriverDto) {
    return this.driverService.update(id, updateUserDto);
  }

  @Delete('one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
