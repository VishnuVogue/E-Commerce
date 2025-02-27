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

// Allowed Origins (Frontend & Admin Panel)
const allowedOrigins = [
    'https://e-commerce-frontend-q4g0c1p1u-mahato-deepaks-projects.vercel.app',
    'https://e-commerce-26eb-h8og6z0ev-mahato-deepaks-projects.vercel.app/'
];

// CORS Middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Middleware
app.use(express.json());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root Route
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Error Handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

// Start Server
app.listen(port, () => {
    console.log("Server started on PORT: " + port);
});
