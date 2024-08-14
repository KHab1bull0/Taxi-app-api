import { PartialType } from '@nestjs/mapped-types';
import { CreateRefreshtokenDto } from './create-refreshtoken.dto';

export class UpdateRefreshtokenDto extends PartialType(CreateRefreshtokenDto) {}
