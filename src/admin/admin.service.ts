import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    try {
      return await this.prisma.admins.findMany();
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async findOne(id: string) {
    try {
      return await this.prisma.admins.findFirst({ where: { id: id } })
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async update(id: string, updateUserDto: UpdateAdminDto) {
    try {
      const newUser = await this.prisma.admins.update({ data: updateUserDto, where: { id: id } });
      return { message: "Admin updated", newUser: newUser };
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.prisma.admins.delete({ where: { id: id } });
      return { message: "Admin deleted", deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }
}
