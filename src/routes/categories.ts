import { Router } from "express";
import {
  deleteCategory,
  updateCategory,
  getAllCategories,
  getCategory,
  createCategory,
} from "../controller/categoryController";
import { validateToken } from "../middleware/authorization";
const router = Router();

router.get("/", validateToken, getAllCategories);
router.get("/:id", validateToken, getCategory);
router.post("/create", validateToken, createCategory);
router.patch("/update/:id", validateToken, updateCategory);
router.delete("/delete/:id", validateToken, deleteCategory);

export default router;
