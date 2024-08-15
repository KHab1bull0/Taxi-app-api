import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCurrentorderDto } from './dto/create-currentorder.dto';
import { getDistance } from 'geolib';
import { PrismaService } from 'prisma/prisma.service';
import { Currency } from '.prisma/client';


@Injectable()
export class CurrentorderService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createCurrentorderDto: CreateCurrentorderDto, req) {
    try {
      const { start_dir, end_dir } = createCurrentorderDto;
      const { email } = req;

      const user = await this.prisma.users.findFirst({ where: { email: email } });
      if (!user) {
        return { message: "User not found", status: HttpStatus.NOT_FOUND };
      }


      const start = { latitude: start_dir[0], longitude: start_dir[1] };
      const end = { latitude: end_dir[0], longitude: end_dir[1] };

      const distance = getDistance(start, end);
      console.log(`Masofa: ${distance} metr`);

      let start_direction = `${start_dir[0]} ${start_dir[1]}`
      let end_direction = `${end_dir[0]} ${end_dir[1]}`

      const newOrder = {
        start_dir: start_direction,
        end_dir: end_direction,
        user_id: user.id,
        amount: 2000 * (distance / 1000),
        currency: Currency.uzs
      }

      const order = await this.prisma.currentOrder.create({ data: newOrder });

      return order
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  findAll() {
    return `This action returns all currentorder`;
  }

  async findOne(id: string) {
    try {
      const order = await this.prisma.currentOrder.findFirst({ where: { id: id } });
      if (!order) {
        return { message: "Order not found", status: HttpStatus.NOT_FOUND };
      }
      return order;

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }

  }

  async remove(id: string) {
    try {
      const order = await this.prisma.currentOrder.findFirst({ where: { id: id } });
      if (!order) {
        return { message: "Order not found", status: HttpStatus.NOT_FOUND };
      }

      const deletedOrder = await this.prisma.currentOrder.delete({ where: { id: id } });

      return { message: "Order deleted", status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
