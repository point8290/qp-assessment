import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import connection from "./config/typeorm";
import handleError from "./middleware/handleError";
import AuthRouter from "./routes/auth";
import GroceryItemRouter from "./routes/groceryItem";
import CategoryRouter from "./routes/categories";
import OrderRouter from "./routes/order";
import "reflect-metadata";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

app.use("/auth", AuthRouter);
app.use("/product", GroceryItemRouter);
app.use("/category", CategoryRouter);
app.use("/order", OrderRouter);
app.use(handleError);

connection
  .initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));
