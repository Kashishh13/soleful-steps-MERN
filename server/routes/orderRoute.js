import express from 'express'
import auth from '../middleware/auth.js';
import { adminOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
const orderRouter=express.Router()
orderRouter.post("/place",auth,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",auth,userOrders)
orderRouter.post("/list",adminOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter