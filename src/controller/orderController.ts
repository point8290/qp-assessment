import { Request, Response, NextFunction } from "express";
import { Order, OrderStatus } from "../entities/Order/Order";
import connection from "../config/typeorm";
import { OrderProduct } from "../entities/Order/OrderProduct";

const orderRepository = connection.getRepository(Order);

type OrderProductData = {
  price: number;
  quantity: number;
  productId: number;
};

export const order = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.userId;
    const { items }: { items: OrderProductData[] } = req.body;

    const totalQuantity = items.length;
    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const { productId, price, quantity } = item;
      totalAmount += price * quantity;
      return Object.assign(new OrderProduct(), {
        productId,
        quantity,
        price,
      });
    });

    const order = Object.assign(new Order(), {
      userId,
      orderItems,
      totalQuantity,
      totalAmount,
    });

    await orderRepository.save(order);

    res.status(201).send({ message: "Order successfully" });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = Number(req.params.id);
    const order = await orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new Error("Order not found");
    }

    await orderRepository.update(orderId, { status: OrderStatus.CANCELLED });
    res.status(200).json({ message: "Order cancelled successfully!!" });
  } catch (err) {
    next(err);
  }
};
export const getOrder = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = Number(req.params.id);
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new Error("Order not found");
    }

    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};
