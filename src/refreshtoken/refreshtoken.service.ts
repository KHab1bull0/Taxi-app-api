import { Injectable } from '@nestjs/common';
import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';
import { UpdateRefreshtokenDto } from './dto/update-refreshtoken.dto';

@Injectable()
export class RefreshtokenService {
  create(createRefreshtokenDto: CreateRefreshtokenDto) {
    return 'This action adds a new refreshtoken';
  }

  findAll() {
    return `This action returns all refreshtoken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refreshtoken`;
  }

  update(id: number, updateRefreshtokenDto: UpdateRefreshtokenDto) {
    return `This action updates a #${id} refreshtoken`;
  }

  remove(id: number) {
    return `This action removes a #${id} refreshtoken`;
  }
}
