import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class HashService {
    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
