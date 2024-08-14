import { HttpStatus, Injectable } from '@nestjs/common';
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
      const admin =  await this.prisma.admins.findMany();
      return {status: HttpStatus.OK, admin}
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async findOne(id: string) {
    try {
      const admin = await this.prisma.admins.findFirst({ where: { id: id } })
      if (!admin) {
        return { message: "ADMIN not found", status: HttpStatus.NOT_FOUND };
      }
      return {status: HttpStatus.OK, admin}
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async update(id: string, updateUserDto: UpdateAdminDto) {
    try {
      const admin = await this.prisma.admins.findFirst({ where: { id: id } })
      if (!admin) {
        return { message: "ADMIN not found", status: HttpStatus.NOT_FOUND };
      }

      const newUser = await this.prisma.admins.update({ data: updateUserDto, where: { id: id } });
      return { message: "ADMIN updated", status: HttpStatus.OK, newUser: newUser };
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async remove(id: string) {
    try {
      const admin = await this.prisma.admins.findFirst({ where: { id: id } })
      if (!admin) {
        return { message: "ADMIN not found", status: HttpStatus.NOT_FOUND };
      }

      const deleteUser = await this.prisma.admins.delete({ where: { id: id } });
      return { message: "ADMIN deleted", status: HttpStatus.OK, deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }
}
