import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupAdminDto } from './dto/admin/signupAdmin.dto';
import { SignupUserDto } from './dto/user/signupUser.dto';
import { SignupDriverDto } from './dto/driver/signupDriver.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/helper/mail.service';
import { OtpService } from 'src/helper/otp.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';
import { OtpDto } from './dto/otpDto';
import { SigninDto } from './dto/signinDriver.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly otp: OtpService,
    private readonly hash: HashService,
    private readonly jwtservice: JwtService
  ) { }

  async signupAdmin(signupAdminDto: SignupAdminDto) {
    try {
      const { fullname, email, password } = signupAdminDto;
      const user = await this.prisma.admins.findFirst({ where: { email: email } });

      if (user) {
        return { message: "Admin already exists", status: HttpStatus.BAD_REQUEST }
      }

      signupAdminDto.password = await this.hash.hashPassword(signupAdminDto.password);

      const newUser = await this.prisma.admins.create({
        data: signupAdminDto
      });

      const number = this.otp.generateOtp(6)
      const otp = await this.prisma.otps.create({
        data: { email: email, otp: number }
      });

      this.mail.sendMail(email, 'Otp', number)

      return {
        sendOtp: true,
        newAdmin: newUser
      }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }
  async signupUser(signupUserDto: SignupUserDto) {
    try {

      const { fullname, email, password } = signupUserDto;
      const user = await this.prisma.users.findFirst({ where: { email: email } });

      if (user) {
        return { message: "User already exists", status: HttpStatus.BAD_REQUEST }
      }

      signupUserDto.password = await this.hash.hashPassword(signupUserDto.password);

      const newUser = await this.prisma.users.create({
        data: signupUserDto
      });

      const number = this.otp.generateOtp(6);
      const otp = await this.prisma.otps.create({
        data: { email: email, otp: number }
      });

      this.mail.sendMail(email, 'Otp', number);

      return {
        status: HttpStatus.OK,
        sendOtp: true,
        newAdmin: newUser
      };

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }

  async signupDriver(signupDriverDto: SignupDriverDto) {
    try {
      const { fullname, email, password } = signupDriverDto;
      const user = await this.prisma.drivers.findFirst({ where: { email: email } });

      if (user) {
        return { messages: "Driver already exists", status: HttpStatus.BAD_REQUEST };
      }

      signupDriverDto.password = await this.hash.hashPassword(signupDriverDto.password);

      const newDriver = await this.prisma.drivers.create({
        data: signupDriverDto
      });

      const number = this.otp.generateOtp(6)
      const otp = await this.prisma.otps.create({
        data: { email: email, otp: number }
      });

      this.mail.sendMail(email, 'Otp', number)
      this.prisma.wallet.create({
        data: {
          driver_id: newDriver.id,
          amount: 0
        }
      });
      return {
        status: HttpStatus.OK,
        sendOtp: true,
        newAdmin: newDriver
      }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async login(signinDto: SigninDto, role: string) {
    try {

      const validUser = await this.validateUser(signinDto.email, signinDto.password, role);
      const { access, refresh } = await this.refreshTokenFunc(signinDto.email, role);

      return {
        status: HttpStatus.OK,
        accessToken: access,
        refreshToken: refresh
      }
      
    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async refreshTokenFunc(email: string, role: string) {

    const payload = { email: email, role: role };
    const access = this.jwtservice.sign(payload, { secret: process.env.ACCESS_KEY, expiresIn: process.env.ACCESS_EXPIRE_TIME })
    const refresh = this.jwtservice.sign(payload, { secret: process.env.REFRESH_KEY, expiresIn: process.env.REFRESH_EXPIRE_TIME })

    const dbrefresh = await this.prisma.refreshTokens.findFirst({
      where: { email: email }
    });

    if (dbrefresh) {
      const updateRefresh = await this.prisma.refreshTokens.update({
        data: { token: refresh },
        where: { id: dbrefresh.id }
      });

    } else {
      const newRefresh = await this.prisma.refreshTokens.create({
        data: { email: email, token: refresh }
      });

    }
    return { access, refresh }
  }


  async verify(otpDto: OtpDto, role: string) {
    try {
      const otp = await this.prisma.otps.findFirst({ where: { email: otpDto.email } });

      if (otp.otp === otpDto.otp) {
        if (role === 'user') {
          const user = await this.prisma.users.findFirst({ where: { email: otp.email } })
          await this.prisma.otps.delete({ where: { id: otp.id } });
          await this.prisma.users.update({
            data: { status: "active" },
            where: { id: user.id }
          });
          return { message: "Verifyed", status: HttpStatus.OK, }

        } else if (role === 'admin') {
          const user = await this.prisma.admins.findFirst({ where: { email: otp.email } })
          await this.prisma.otps.delete({ where: { id: otp.id } });
          await this.prisma.admins.update({
            data: { status: "active" },
            where: { id: user.id }
          });
          return { message: "Verifyed", status: HttpStatus.OK, }

        } else if (role === 'driver') {
          const user = await this.prisma.drivers.findFirst({ where: { email: otp.email } })
          await this.prisma.otps.delete({ where: { id: otp.id } });
          await this.prisma.drivers.update({
            data: { status: "active" },
            where: { id: user.id }
          });
          return { message: "Verifyed", status: HttpStatus.OK, }
        }
      }
      throw new BadRequestException("Invalid Otp")

    } catch (e) {
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }



  async getProfile(email: string, role: string) {
    try {

      if (role === 'user') {
        const user = await this.prisma.users.findFirst({ where: { email: email } });
        if (!user) {
          return { messages: `${role.toUpperCase()} not found`, status: HttpStatus.NOT_FOUND };
        }
        const { password, ...result } = user
        return { status: HttpStatus.OK, result }

      } else if (role === 'admin') {
        const user = await this.prisma.admins.findFirst({ where: { email: email } });
        if (!user) {
          return { messages: `${role.toUpperCase()} not found`, status: HttpStatus.NOT_FOUND };
        }
        const { password, ...result } = user
        return { status: HttpStatus.OK, result }

      } else if (role === 'driver') {
        const user = await this.prisma.drivers.findFirst({ where: { email: email } });
        if (!user) {
          return { messages: `${role.toUpperCase()} not found`, status: HttpStatus.NOT_FOUND };
        }
        const { password, ...result } = user
        return { status: HttpStatus.OK, result }

      }

    } catch (e) {
      console.log(e);
      return { error: e, status: HttpStatus.INTERNAL_SERVER_ERROR }
    }
  }


  async refreshToken(user, role) {
    const { access, refresh } = await this.refreshTokenFunc(user, role);
    return { accresToken: access };
  }


  async validateUser(email: string, pass: string, role: string) {
    let user: any = undefined

    if (role === 'user') {
      user = await this.prisma.users.findFirst({ where: { email: email } });
    } else if (role === 'admin') {
      user = await this.prisma.admins.findFirst({ where: { email: email } });
    } else if (role === 'driver') {
      user = await this.prisma.drivers.findFirst({ where: { email: email } });
    }

    if (!user) {
      throw { message: `${role.toUpperCase()} not found`, status: HttpStatus.NOT_FOUND }
    }

    if (user && (await this.hash.comparePasswords(pass, user.password))) {
      return user;
    }
    return undefined;
  }
}
