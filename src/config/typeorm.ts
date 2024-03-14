import dotenv from "dotenv";
import { User } from "../entities/User/User";
import { GroceryItem } from "../entities/GroceryItem/GroceryItem";
import { Category } from "../entities/Category/Category";
import { DataSource } from "typeorm";
import { Order } from "../entities/Order/Order";
import { OrderProduct } from "../entities/Order/OrderProduct";
dotenv.config();

const connection = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Category, GroceryItem, Order, OrderProduct],
  synchronize: true,
  logging: false,
});

export default connection;
