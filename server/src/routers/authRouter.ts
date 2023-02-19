import {Router } from "express";
import AuthController from "../controllers/AuthController";
import ResetController from "../controllers/ResetController";
import authMiddleware from "../middleware/authMiddleware";
import { check } from "express-validator"

const authRouter = Router()

authRouter.post("/registration",
    [
      check("email", "Invalid email").isEmail(),
      check("password","Password must be more than 4 and less than 10 characters.").isLength({ min: 4, max: 10 }),
    ],
    AuthController.registration
  );

authRouter.post("/login", AuthController.login);
authRouter.get("/users", authMiddleware, AuthController.getUsers);
authRouter.delete("/users/:id", authMiddleware, AuthController.delete);
authRouter.get("/users/id/:id", authMiddleware, AuthController.getUserById);
authRouter.get("/users/email/:email", authMiddleware, AuthController.getUserByEmail);
authRouter.post("/recover", ResetController.recover);
authRouter.put("/reset/:token",
[
  check("password","Password must be more than 4 and less than 10 characters.").isLength({ min: 4, max: 10 }),
],
ResetController.reset);


export default authRouter;