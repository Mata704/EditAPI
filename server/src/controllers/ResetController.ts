import {NextFunction, Request, Response } from "express";
import ResetService from "../services/ResetService";
import { validationResult } from "express-validator"
import dotenv from "dotenv";

dotenv.config();


class ResetController{

  async recover(req: Request, res: Response, next: NextFunction) {
    try {
      //if not then create user
      const findedEmail = await ResetService.recover(req.body);

      return res.json({ message: "Password Recover Email Found", findedEmail });
    } catch (error: unknown) {
      if (error instanceof Error){
        next(error.message)
      } 
    }
  }

  async reset(req: Request, res: Response, next: NextFunction) {

    try {
      const errors = validationResult(req);
   
      if (!errors.isEmpty()) {
        return res.status(500).json({errors: errors.array()});
      }

      const { token } = req.params;
      const { password } = req.body;

      //if not then create user
      await ResetService.reset(token,password);

      return res.json({ message: "Password Changed"});
    } catch (error: unknown) {
      if (error instanceof Error){
        next(error.message)
      }  
    }
  }

}

export  default new ResetController()