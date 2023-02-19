import {NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { validationResult } from "express-validator"


class ProductController{
    
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).send({errors: errors.array()})
        }
        const product = await ProductService.create(req.body, req.files?.image );
        return res.status(201).send(product);
      } catch (error) {
        if (error instanceof Error){
          next(error.message)
        }
      }
    };

    async getAll(req: Request, res: Response, next: NextFunction){
      try {
      const products= await ProductService.getAll();
      return res.status(200).send(products);
      } catch (error) {
        if (error instanceof Error){
          next(error.message)
        }
      }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
      try {
      const { id } =req.params
      const product= await ProductService.getOne(id);
      return res.status(200).send(product)
      } catch (error) {
        if (error instanceof Error){
          next(error.message)
        }
      }
    }
    
    async update(req: Request, res: Response, next: NextFunction) {
        try {
        const product= await ProductService.update( req.params,req.body);
        return res.status(200).send(product)
        } catch (error) {
          if (error instanceof Error){
            next(error.message)
          }
        }
       }
    
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
        const product= await ProductService.delete(req.params);
        return res.status(200).send(product)
        } catch (error) {
          if (error instanceof Error){
            next(error.message)
          }
        }
       }



}

export  default new ProductController()