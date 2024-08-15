import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    try {
      const users = await this.prisma.users.findMany();
      return { message: "Ok", status: HttpStatus.OK, users: users };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } })
      if (!user) {
        return { message: "USER not found", status: HttpStatus.NOT_FOUND };
      }
      return { message: "Ok", status: HttpStatus.OK, user: user };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async update(id: string, updateUserDto: any) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } })
      if (!user) {
        return { message: "USER not found", status: HttpStatus.NOT_FOUND };
      }

      const newUser = await this.prisma.users.update({ data: updateUserDto, where: { id: id } });
      return { message: "User updated", status: HttpStatus.OK, newUser: newUser };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } })
      if (!user) {
        return { message: "USER not found", status: HttpStatus.NOT_FOUND };
      }
      const deleteUser = await this.prisma.users.delete({ where: { email: user.email } });
      const userOtp = await this.prisma.otps.delete({ where: { email: user.email } });
      return { message: "User deleted", status: HttpStatus.OK, deletedOtp: true, deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async addComment(id: string, body: CommentDto) {
    try {
      const order = await this.prisma.orders.findFirst({ where: { id: id } });
      if (!order) {
        return { message: "ORDER not found", status: HttpStatus.NOT_FOUND };
      }

      if (order.status === OrderStatus.completed) {
        const updatedOrder = await this.prisma.orders.update({ data: { score: body.score, comment: body.comment }, where: { id: id } });
        return { message: "Added comment and score to comment", status: HttpStatus.OK, updatedOrder }
      }
      const driverwallet = await this.prisma.wallet.findFirst({ where: { id: order.driver_id } });

      await this.prisma.wallet.update({ data: { amount: driverwallet.amount + order.amount }, where: { id: order.driver_id } });

      return { message: "Order isn't completed", status: HttpStatus.BAD_REQUEST };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
}
