import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "../User/User";
import { OrderProduct } from "../Order/OrderProduct";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  DELIEVERED = "delievered",
  CANCELLED = "cancelled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;

  @OneToOne(() => User, (user: User) => user.id)
  userId: number;

  @Column()
  totalQuantity: number;

  @Column()
  totalAmount: number;

  @OneToMany(() => OrderProduct, (item: OrderProduct) => item.id)
  orderItems: OrderProduct[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
