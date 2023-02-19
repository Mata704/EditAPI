import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter";
import authRouter from "./routers/authRouter";
import errorMiddleware from "./middleware/errorMiddleware"

dotenv.config();

//App and Mongo info
// Indicamos a porta
const PORT: number = Number(process.env.PORT) || 7000;
const MONGO_URI: string = String(process.env.MONGO_URI);

const app = express();
app.use(fileUpload());
app.use(express.static("static"))
app.use(express.json());


//Create connection to mongo
const startApp = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI);
    console.log("Successefully connected to db");
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

startApp();

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("ok");
});

app.use(router);
app.use("/api", productRouter)
app.use("/auth", authRouter)
app.use(errorMiddleware);
