import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    try {
      const otps = await this.prisma.otps.findMany();
      return otps
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    };
  }

  async removebyId(id: string) {
    try {
      const otp = await this.prisma.otps.findFirst({ where: { id: id } });
      if (!otp) {
        return { message: "Otp not found", status: HttpStatus.NOT_FOUND };
      }

      const deletedOtp = await this.prisma.otps.delete({ where: { id: id } });
      return { message: "Otp deleted", status: HttpStatus.OK };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
}
