import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    try {
      return await this.prisma.users.findMany();
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async findOne(id: string) {
    try {
      const user =  await this.prisma.users.findFirst({ where: { id: id } })
      if(!user){
        return {message: "User not found", status: HttpStatus.NOT_FOUND};
      }
      return user

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user =  await this.prisma.users.findFirst({ where: { id: id } })
      if(!user){
        return {message: "User not found", status: HttpStatus.NOT_FOUND};
      }

      const newUser = await this.prisma.users.update({ data: updateUserDto, where: { id: id } });
      return { message: "User updated", newUser: newUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async remove(id: string) {
    try {
      const user =  await this.prisma.users.findFirst({ where: { id: id } })
      if(!user){
        return {message: "User not found", status: HttpStatus.NOT_FOUND};
      }
      
      const deleteUser = await this.prisma.users.delete({ where: { id: id } });
      return { message: "User deleted", deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }
}
