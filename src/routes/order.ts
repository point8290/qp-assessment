import { Router } from "express";
import { order, getOrder, cancelOrder } from "../controller/orderController";
import { validateToken } from "../middleware/authorization";

const router = Router();

router.post("/", validateToken, order);
router.get("/:id", validateToken, getOrder);
router.get("/cancel-order/:id", validateToken, cancelOrder);

export default router;
