import {NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import { validationResult } from "express-validator"
import dotenv from "dotenv";
import ApiError from './../exceptions/ApiError';

dotenv.config();


class AuthController{

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      //See if exist errors in registration
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Validation errors.", errors.array()))
      }
      //if not then create user
      const createdUser = await AuthService.registration(req.body);
      return res.json({ message: "User created", createdUser });
    } catch (error: unknown) {
      if (error instanceof Error){
        next(error.message)
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
    const user= await AuthService.delete(req.params);
    return res.status(200).send(user)
    } catch (error) {
      if (error instanceof Error){
        next(error.message)
      }
    }
   }

  async login(req: Request, res: Response,next: NextFunction) {
    try {
      const { email, password } = req.body;
      const foundUser = await AuthService.login(email, password);
      return res.json({ message: "Login success", foundUser });
    } catch (error: unknown) {
      if (error instanceof Error){
        next(error.message)
      }
    }
  }

  async getUsers(req: any, res: Response, next: NextFunction) {
    try {
      const users = await AuthService.getAllUsers();
      return res.json(users);
    } catch (error: unknown) {
      if (error instanceof Error){
        next(error.message)
      }
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } =req.params
    const user= await AuthService.getUserById(id);
    return res.status(200).send(user)
    } catch (error) {
      if (error instanceof Error){
        next(error.message)
      }
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
    const { email } =req.params
    const user= await AuthService.getUserByEmail(email);
    return res.status(200).send(user)
    } catch (error) {
      if (error instanceof Error){
        next(error.message)
      }
    }
  }

}

export  default new AuthController()