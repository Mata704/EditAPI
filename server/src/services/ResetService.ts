import UserModel from "../models/UserModel";
import TokenService from "./TokenService";
import SendEmailService from "./SendEmailService";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


class ResetService{

  async recover(body: any): Promise<any> {
    //Start dotenv
    dotenv.config();
    
    const { email } = body;
    
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      throw new Error(`Email ${email} not found`);
    }

    const token = TokenService.generateTokens(foundUser,String(process.env.TOKEN_RECOVERY_DAYS))

    //create info to send
    const info = {
      to: email,
      subject: "Password recovery",
      text: "",
      html: `
        <div>
          <h1>Ativar conta</h1>
          <p>Use this link to reset your password</p>
          <a href="http://localhost:5000/auth/reset/${token.accessToken}">http://localhost:5000/auth/reset/${token.accessToken}</a>
        </div>
      `,
    }
    
    await SendEmailService.sendEmail(info);

    return {
      email: email,
    };
  } 
  
  async reset(token: string,password:string){

    const decoded: any = jwt.verify(token,String(process.env.SECRET_KEY_ACCESS));
    const id: string =decoded.id
    
    const codedPass = bcrypt.hashSync(password, 7);
    password=codedPass
    const user = await UserModel.findByIdAndUpdate( id,{ password },{ new: true });
    if (!user) {
      throw new Error(`Password not updated`);
    }


  } 
  
  
  



}


export  default new ResetService();