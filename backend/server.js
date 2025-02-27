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
    'https://e-commerce-1vzp-qudb151jq-mahato-deepaks-projects.vercel.app',
    'https://e-commerce-26eb-h8og6z0ev-mahato-deepaks-projects.vercel.app' // Replace with actual admin URL
];

// CORS Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Middleware
app.use(express.json());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root Route
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Handle Unauthorized Access (401 Errors)
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS Policy: Access denied' });
    }
    res.status(500).json({ error: err.message });
});

// Start Server
app.listen(port, () => {
    console.log("Server started on PORT: " + port);
});
