import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator'

@Injectable()
export class OtpService {
    generateOtp(length: number = 6): string {
        return otpGenerator.generate(length, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        });
    }
}
