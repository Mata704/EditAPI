import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export default (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (req.method === "OPTIONS") {
      return next();
    }
  
  // verificar se existe token no header
  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }
  //Se existe, ir buscar após o Beared
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  try {
    const decoded = jwt.verify(token,String(process.env.SECRET_KEY_ACCESS));
    /*
      neste momento temos o objeto com o id e as roles
      (aquele payload que nos enviamos na função generateAccessToken)
    */
    req.user = decoded;
    next();
  } catch (error: unknown) {
    return res.status(401).send({ message: "Bad format token", error });
  }
  };