import nodemailer from "nodemailer";
import dotenv from "dotenv";

//Start dotenv
dotenv.config();

//Create token Payload info using role
interface EmailInfo {
  to: string;
  subject: string;
  text: string;
  html: string;
}

class SendEmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: String(process.env.SMTP_EMAIL),
        pass: String(process.env.SMTP_PASS),
      },
    });
  }
  
  async sendEmail(emailInfo: EmailInfo): Promise<void> {
    const { to, subject, text, html } = emailInfo;

    await this.transporter.sendMail({
      from: String(process.env.SMTP_HOST),
      to,
      subject,
      text,
      html
    });

      }
}


export default new SendEmailService();