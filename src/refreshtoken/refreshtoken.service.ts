import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshtokenService {

  findAll() {
    return `This action returns all refreshtoken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refreshtoken`;
  }

  remove(id: number) {
    return `This action removes a #${id} refreshtoken`;
  }
}
