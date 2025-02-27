import express from 'express';
import {placeOrder, placeOrderStripe, userOrders,allOrders,updateStatus, placeOrderRazorPay, verifyStripe, verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin Feature
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorPay);

//user Feature
orderRouter.post('/userorders',authUser,userOrders)

//verify route
orderRouter.post("/verifyStripe",authUser,verifyStripe)
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)

export default orderRouter;