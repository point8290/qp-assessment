import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Category } from "../Category/Category";
import { GroceryItem } from "../GroceryItem/GroceryItem";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @ManyToMany(() => GroceryItem, (item: GroceryItem) => item.id)
  productId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
