import { PartialType } from '@nestjs/mapped-types';
import { SignupDriverDto } from 'src/auth/dto/driver/signupDriver.dto';

export class UpdateDriverDto extends PartialType(SignupDriverDto) {}
