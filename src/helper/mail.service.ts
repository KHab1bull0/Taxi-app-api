import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter:any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP hosti (masalan, Gmail uchun 'smtp.gmail.com')
      port: 587, // Port (masalan, Gmail uchun 587)
      secure: false, // true agar 465 port ishlatilsa, aks holda false
      auth: {
        user: process.env.SMTP_USER, // SMTP email
        pass: process.env.SMTP_PASSWORD, // SMTP parol
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.SMTP_USER, // Jo'natuvchi manzili
      to, // Qabul qiluvchi email
      subject, // Mavzu
      // text, // Matn
      html: `<h1>Token</h1><br> <p>${text}</p>`
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
