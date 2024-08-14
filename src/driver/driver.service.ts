import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DriverService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    try {
      return await this.prisma.drivers.findMany();
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async findOne(id: string) {
    try {
      return await this.prisma.drivers.findFirst({ where: { id: id } })
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async update(id: string, updateUserDto: UpdateDriverDto) {
    try {
      const newUser = await this.prisma.drivers.update({ data: updateUserDto, where: { id: id } });
      return { message: "Driver updated", newUser: newUser };
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.prisma.drivers.delete({ where: { id: id } });
      return { message: "Driver deleted", deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }
}
