import { NextFunction, Request, Response } from "express";
import connection from "../config/typeorm";
import { GroceryItem } from "../entities/GroceryItem/GroceryItem";
import { Category } from "../entities/Category/Category";

const groceryItemRepository = connection.getRepository(GroceryItem);
const categoryRepository = connection.getRepository(Category);

const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const { name, description, price, discount, quantity, categoryId } =
      req.body;

    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (category) {
      const product = Object.assign(new GroceryItem(), {
        name,
        description,
        price,
        discount,
        quantity,
        categoryId,
      });
      const item = await groceryItemRepository.save(product);

      res.status(200).json({ item });
    } else {
      throw new Error("category not found");
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const itemId = Number(req.params.id);
  try {
    const item = await groceryItemRepository.findOne({ where: { id: itemId } });
    if (!item) {
      throw new Error("No product found");
    }
    res.status(200).json({ item });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const itemId = Number(req.params.id);
    await groceryItemRepository.update(itemId, {
      ...req.body,
    });

    const item = await groceryItemRepository.findOne({ where: { id: itemId } });

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const itemId = Number(req.params.id);
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const item = await groceryItemRepository.findOneBy({ id: itemId });

    if (!item) {
      throw new Error("this item does not exist");
    }
    await groceryItemRepository.remove(item);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await groceryItemRepository.find();
    res.status(200).send({ items });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const manageInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const itemId = Number(req.params.id);
    const { count, action } = req.body;
    const item = await groceryItemRepository.findOne({ where: { id: itemId } });
    if (item) {
      switch (action) {
        case "INCREASE_QUANTITY":
          item.quantity += count;
          break;

        case "DECREASE_QUANTITY":
          item.quantity -= count;
          break;

        default:
          break;
      }

      await groceryItemRepository.update(itemId, item);

      res.status(200).json({ item });
    } else {
      throw new Error("Item not found");
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export {
  deleteItem,
  updateItem,
  createItem,
  getItem,
  getAllItems,
  manageInventory,
};
