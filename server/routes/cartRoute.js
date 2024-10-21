import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js'
const cartRouter=express.Router();
import auth from '../middleware/auth.js';

cartRouter.post("/add",auth,addToCart);
cartRouter.post("/remove",auth,removeFromCart)
cartRouter.post("/get",auth,getCart)

export default cartRouter