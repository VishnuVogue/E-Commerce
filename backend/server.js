import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from './routes/userRoute.js';
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// 🔥 Fix CORS Here
app.use(cors({
    origin: ["https://e-commerce-26eb.vercel.app", "https://e-commerce-1vzp.vercel.app"], // Remove trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
}));

// ✅ Handle Preflight Requests Globally
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://e-commerce-26eb.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, token");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Start Server
app.listen(port, () => {
    console.log("Server started on PORT : " + port);
});
