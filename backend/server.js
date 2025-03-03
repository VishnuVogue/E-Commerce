import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import serverless from "serverless-http";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database & Cloudinary
connectDB();
connectCloudinary();

// ✅ CORS Configuration - Must be BEFORE routes
const allowedOrigins = [
    "https://e-commerce-1vzp.vercel.app",
    "https://e-commerce-26eb.vercel.app",
    "http://localhost:5173",  // Add localhost for local dev
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
}));

// ✅ Handle Preflight (OPTIONS) Requests
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, token");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);  // Respond with status 204 for OPTIONS preflight
    }
    next();
});

// Middleware
app.use(express.json());

// ✅ Define API Routes AFTER CORS Middleware
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Simple route to check API status
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Wrap the Express app with serverless-http for Vercel
export const handler = serverless(app);

