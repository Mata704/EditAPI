import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs";
import TokenService from "./TokenService";
import dotenv from "dotenv";

//Start dotenv
dotenv.config();

class AuthService{

    async login(email: string, password: string) {
        
        //find user
        const foundUser = await this.findEmail(email)
        if (!foundUser) {
          throw new Error(`User ${email} not found`);
        }
        
        //password compare
        const validPassword = await this.validPassword(password, foundUser.password);
        if (!validPassword) {
          throw new Error("Password invalid");
        }
    
        //create token
        const tokens = TokenService.generateTokens(foundUser, String(process.env.TOKEN_LOGIN_DAYS));
    
        return {
          token: tokens,
          user: foundUser,
        };
      }




    async registration(user: any): Promise<any> {
    
      const { email, password } = user;
  
      //see if user exists
      const candidate = await UserModel.findOne({ email: email });
      if (candidate) {
        //return ApiError.BadRequest("Username already exists.");
        throw new Error("Email already exists");
      }

      //hash password (pass, hash level)
      const hashPassword = bcrypt.hashSync(password, 7);

      const CreateUser = new UserModel({
          email,
          password: hashPassword   
        });

      const createdUser = await CreateUser.save();

      return createdUser;
    }

    async delete(params: any) {
      const { id } = params
      const deleteUser= await UserModel.findByIdAndDelete(id);
      if(!deleteUser) {
          throw new Error("User not found.");
      }
      return deleteUser
    };

    async getUserByEmail(email: string) {
        
      //find user
      const foundUser = await this.findEmail(email)
      if (!foundUser) {
        throw new Error(`Email ${email} not found`);
      }
      return foundUser
    }

    async getUserById(id: string) {
        
      //find user
      const foundUser = await this.findId(id)
      if (!foundUser) {
        throw new Error(`Id ${id} not found`);
      }
      return foundUser
    }

    async validPassword(userPass: string, foundUserPass: string) {
      const validPass = await bcrypt.compare(userPass, foundUserPass)
      return validPass;
      }
    
    async findEmail(email: string) {
      const foundUser = await UserModel.findOne({ email })
      return foundUser
    }

    async findId(id: string) {
      const foundUser= await UserModel.findById(id);
      return foundUser
    };

    async getAllUsers(): Promise<any> {
        const allUsers = await UserModel.find();
        return allUsers;
      }

}


export  default new AuthService();