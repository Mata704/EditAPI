import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//Start dotenv
dotenv.config();

//Create token Payload info using role
interface ITokenPayload {
    id: string,
  }

class TokenService {
    generateTokens(user: any, expiresIn: string) {
        
        const id = user.id;

        //insert roles in payload const
        const payload: ITokenPayload = {id};

        //Create accessToken using payload, secret word and valid for 30 days
        const accessToken = jwt.sign(payload,String(process.env.SECRET_KEY_ACCESS),{ expiresIn:expiresIn });
    
        return { accessToken };
      }

    validateTokens(token: string)
      {
        const decoded = jwt.verify(token,String(process.env.SECRET_KEY_ACCESS));
        return decoded
      }
}


export default new TokenService();