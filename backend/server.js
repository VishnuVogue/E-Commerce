import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from './routes/userRoute.js';
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS configuration to allow multiple frontend URLs
const corsOptions = {
  origin: [
    'https://e-commerce-1vzp-qudb151jq-mahato-deepaks-projects.vercel.app',  // Main frontend URL
    'https://e-commerce-26eb-h8og6z0ev-mahato-deepaks-projects.vercel.app',  // Admin panel URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));  // Apply the CORS configuration

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log("Server started on PORT : " + port);
});
