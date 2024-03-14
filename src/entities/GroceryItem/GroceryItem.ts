import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Category } from "../Category/Category";

@Entity()
export class GroceryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  discount: number;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @ManyToMany(() => Category, (category: Category) => category.id)
  categoryId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
