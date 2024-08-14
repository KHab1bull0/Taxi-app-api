import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/user/signupUser.dto';
import { SignupAdminDto } from './dto/admin/signupAdmin.dto';
import { SignupDriverDto } from './dto/driver/signupDriver.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';
import { join } from 'path';
import { SigninDto } from './dto/signinDriver.dto';
import { OtpDto } from './dto/otpDto';
import { JwtAuthGuard } from './common/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }


  @Post('admin/signup')
  createAdmin(@Body() signupAdminDto: SignupAdminDto) {
    return this.authService.signupAdmin(signupAdminDto);
  }

  @Post('user/signup')
  createUser(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signupUser(signupUserDto);
  }

  @Post('driver/signup')
  @UseInterceptors(FileInterceptor('avatarUrl', { storage: multerOptions.storage }))
  createDriver(@UploadedFile() file: Express.Multer.File, @Body() signupDriverDto: SignupDriverDto) {
   
    if (!file) {
      return new HttpException('Fayl yuborilmadi', HttpStatus.BAD_REQUEST);
    }
    const newdriver = { ...signupDriverDto, avatarUrl: file.filename }
    return this.authService.signupDriver(newdriver);
  }



  @Post('admin/signin')
  signinAdmin(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto, 'admin');
  }

  @Post('user/signin')
  signinUser(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto, 'user');
  }

  @Post('driver/signin')
  signinDriver(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto, 'driver');
  }



  @Post('admin/verify')
  verifyAdmin(@Body() signinDto: OtpDto) {
    return this.authService.verify(signinDto, 'admin');
  }

  @Post('user/verify')
  verifyUser(@Body() signinDto: OtpDto) {
    return this.authService.verify(signinDto, 'user');
  }

  @Post('driver/verify')
  verifyDriver(@Body() signinDto: OtpDto) {
    return this.authService.verify(signinDto, 'driver');
  }



  @UseGuards(JwtAuthGuard)
  @Get("admin/profile")
  async getmeAdmin(@Req() req) {
    const { email } = req.user;
    const user = await this.authService.getProfile(email, 'admin');
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get("user/profile")
  async getmeUser(@Req() req) {
    const { email } = req.user;
    const user = await this.authService.getProfile(email, 'user');
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get("driver/profile")
  async getmeDriver(@Req() req) {
    const { email } = req.user;
    const user = await this.authService.getProfile(email, 'driver');
    return user
  }


  @UseGuards(JwtAuthGuard)
  @Get("refresh")
  async refreshToken(@Req() req) {
    const { email, role } = req.user;
    const user = await this.authService.refreshToken(email, role);
    return user
  }


}
