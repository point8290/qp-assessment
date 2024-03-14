import { Router } from "express";
import { order, getOrder, cancelOrder } from "../controller/orderController";

const router = Router();

router.post("/", order);
router.get("/:id", getOrder);
router.get("/cancel-order/:id", cancelOrder);

export default router;
