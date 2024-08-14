import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { emit } from 'process';

@Injectable()
export class RefreshtokenService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    try {
      const tokens = await this.prisma.refreshTokens.findMany();
      return tokens
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async findOne(id: string) {
    try {
      const token = await this.prisma.refreshTokens.findFirst({ where: { id: id } });
      if (!token) {
        return { message: "Token not found", status: HttpStatus.NOT_FOUND };
      }
      return { status: HttpStatus.OK, token }
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async remove(id: string) {
    try {
      const token = await this.prisma.refreshTokens.findFirst({ where: { id: id } });
      if (!token) {
        return { message: "Token not found", status: HttpStatus.NOT_FOUND };
      }

      const deletedToken = await this.prisma.refreshTokens.delete({ where: { id: id } });
      return { message: "Token deleted", status: HttpStatus.OK, deletedToken }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
}
