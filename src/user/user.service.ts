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
      const users =  await this.prisma.users.findMany();
      return {message: "Ok",  status: HttpStatus.OK, users: users};
    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async findOne(id: string) {
    try {
      const user =  await this.prisma.users.findFirst({ where: { id: id } })
      if(!user){
        return {message: "USER not found", status: HttpStatus.NOT_FOUND};
      }
      return { message: "Ok",  status: HttpStatus.OK, user: user};

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user =  await this.prisma.users.findFirst({ where: { id: id } })
      if(!user){
        return {message: "USER not found", status: HttpStatus.NOT_FOUND};
      }

      const newUser = await this.prisma.users.update({ data: updateUserDto, where: { id: id } });
      return { message: "User updated", status: HttpStatus.OK,  newUser: newUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }

  async remove(id: string) {
    try {
      const user =  await this.prisma.users.findFirst({ where: { id: id } })
      if(!user){
        return {message: "USER not found", status: HttpStatus.NOT_FOUND};
      }
      const deleteUser = await this.prisma.users.delete({ where: { email: user.email } });
      const userOtp = await this.prisma.otps.delete({where: {email: user.email}});
      return { message: "User deleted", status: HttpStatus.OK, deletedOtp: true,  deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e }
    };
  }
}
