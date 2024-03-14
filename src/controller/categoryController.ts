import { NextFunction, Request, Response } from "express";
import connection from "../config/typeorm";
import { Category } from "../entities/Category/Category";

const categoryRepository = connection.getRepository(Category);

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const { name, type, isActive, description } = req.body;

    const category = Object.assign(new Category(), {
      name,
      description,
      type,
      isActive,
    });
    const result = await categoryRepository.save(category);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryId = Number(req.params.id);
  try {
    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error("No category found");
    }
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const categoryId = Number(req.params.id);
    await categoryRepository.update(categoryId, {
      ...req.body,
    });

    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryId = Number(req.params.id);
  try {
    if (!req.isAdmin) {
      throw new Error("Not authorized");
    }
    const category = await categoryRepository.findOneBy({ id: categoryId });

    if (!category) {
      throw new Error("this category does not exist");
    }
    await categoryRepository.remove(category);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await categoryRepository.find();
    res.status(200).send({ categories });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export {
  deleteCategory,
  updateCategory,
  createCategory,
  getCategory,
  getAllCategories,
};
