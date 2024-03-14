import { Router } from "express";
import {
  deleteItem,
  updateItem,
  createItem,
  getItem,
  manageInventory,
  getAllItems,
} from "../controller/groceryItemController";
import { validateToken } from "../middleware/authorization";
const router = Router();

router.get("/", validateToken, getAllItems);
router.get("/:id", validateToken, getItem);
router.post("/create", validateToken, createItem);
router.post("/manage/:id", validateToken, manageInventory);
router.patch("/update/:id", validateToken, updateItem);
router.delete("/delete/:id", validateToken, deleteItem);

export default router;
