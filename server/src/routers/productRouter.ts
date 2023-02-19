import {Router} from "express";
import ProductController from "../controllers/ProductController";
import authMiddleware from "../middleware/authMiddleware";
import { check } from "express-validator"

const productRouter = Router()

productRouter.post("/products",[
    check("name").notEmpty().withMessage("Name can't be empty").isLength({min: 4, max:35}).withMessage("Name min:4 max:35"),
    check("quantity").notEmpty().withMessage("Quantity can't be empty").isInt({gt:0}).withMessage("Quantity need to be greater than 0"),
],authMiddleware,
ProductController.create);

productRouter.get("/products",ProductController.getAll);
productRouter.get("/products/:id", ProductController.getOne);
productRouter.put("/products/:id", authMiddleware, ProductController.update);
productRouter.delete("/products/:id", authMiddleware, ProductController.delete)
 

export default productRouter;