import express from "express";
import { getAllOrders, getAllOrdersByMonth, getUserOrders } from "../controllers/orderController.js";
import { adminMiddleware, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/', adminMiddleware, getAllOrders);
router.get('/user/:userId', protectRoute, getUserOrders);
router.get('/month', adminMiddleware, getAllOrdersByMonth);

export default router;