import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export enum Role {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  shippingAddres: string;

  @Column({ nullable: true })
  billingAddres: string;
}
