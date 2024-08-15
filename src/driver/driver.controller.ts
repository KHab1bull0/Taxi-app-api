import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { Roles } from 'src/auth/common/decorators/role.decorator';
import { Role } from 'src/auth/common/types/role.enum';
import { RolesGuard } from 'src/auth/common/guards/role.guard';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Get("all")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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

  @Get('currentorders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  async showCurrentOrders() {
    return await this.driverService.showCurrentOrders();
  }

  @Get('getOrder/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  async getOrder(@Req() req, @Param("id") id: string) {
    const { email } = req.user
    return this.driverService.getOrder(id, email);
  }

  @Get('getOrder/client/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  async getOrderClient(@Param("id") id: string) {
    
    return await this.driverService.getOrderClient(id);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Driver, Role.Admin)
  async showOrders(@Req() req) {
    const { email } = req.user;
    return await this.driverService.showorders(email);
  }

}
