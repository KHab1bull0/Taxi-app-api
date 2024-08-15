import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Currency, OrderStatus } from 'src/helper/enums';


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
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async findOne(id: string) {
    try {
      const driver = await this.prisma.drivers.findFirst({ where: { id: id } })
      if (!driver) {
        return { messages: `DRIVER not found`, status: HttpStatus.NOT_FOUND };
      }
      return driver

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try {

      const driver = await this.prisma.drivers.findFirst({ where: { id: id } })
      if (!driver) {
        return { messages: `DRIVER not found`, status: HttpStatus.NOT_FOUND };
      }

      const newUser = await this.prisma.drivers.update({ data: updateDriverDto, where: { id: id } });
      return { message: "Driver updated", newUser: newUser };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async remove(id: string) {
    try {

      const driver = await this.prisma.drivers.findFirst({ where: { id: id } })
      if (!driver) {
        return { messages: `DRIVER not found`, status: HttpStatus.NOT_FOUND };
      }

      const deleteUser = await this.prisma.drivers.delete({ where: { id: id } });
      return { message: "Driver deleted", status: HttpStatus.OK, deletedUser: deleteUser };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async showCurrentOrders() {
    try {
      const orders = await this.prisma.currentOrder.findMany();
      return { status: HttpStatus.OK, orders };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async getOrder(id: string, email: string) {
    try {
      const order = await this.prisma.currentOrder.findFirst({ where: { id: id } });
      if (!order) {
        return { messages: `ORDER not found`, status: HttpStatus.NOT_FOUND };
      }

      const driver = await this.prisma.drivers.findFirst({ where: { email: email } });
      if (!driver) {
        return { messages: `DRIVER not found`, status: HttpStatus.NOT_FOUND };
      }

      const user = await this.prisma.users.findFirst({ where: { id: order.user_id } });
      if (!user) {
        return { messages: `USER not found`, status: HttpStatus.NOT_FOUND };
      }


      const newOrder = {
        currento_id: id,
        user_id: order.user_id || '1',
        driver_id: driver.id || '1',
        start_dir: order.start_dir || '',
        end_dir: order.end_dir || '',
        status: OrderStatus.accepted,
        date: new Date(),
        start_time: new Date(),
        end_time: new Date(),
        amount: Math.round(order.amount),
        currency: Currency.uzs,
        score: 0,
        comment: "blabla"
      };

      const ordercreated = await this.prisma.orders.create({ data: newOrder });
      // const currentorder = await this.prisma.currentOrder.delete({ where: { id: id } });
      return { message: "Order accepted", status: HttpStatus.OK, order: ordercreated };
       

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async getOrderClient(id: string) {
    try {
      const status = OrderStatus.delivery
      const order = await this.prisma.orders.update({ data: { status: status, start_time: new Date() }, where: { id: id } });

      const deleteCurrentOrder = await this.prisma.currentOrder.update({ data: { status: OrderStatus.completed }, where: { id: order.currento_id } });


      return { message: "Order on delivery time ", status: HttpStatus.OK, currentOrderDeleted: true };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async completeOrder(id: string) {
    try {
      const order = await this.prisma.orders.findFirst({ where: { id: id } });
      if (!order) {
        return { messages: `ORDER not found`, status: HttpStatus.NOT_FOUND };
      }

      const status = OrderStatus.completed
      const complretedorder = await this.prisma.orders.update({ data: { status: status, end_time: new Date() }, where: { id: id } });

      return { message: "Order competed", status: HttpStatus.OK, complretedorder };
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async showorders(email: string) {
    try {
      const driver = await this.prisma.drivers.findFirst({ where: { email: email } })
      return await this.prisma.orders.findMany({ where: { driver_id: driver.id } });
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
}


