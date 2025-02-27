import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // ⏳ Fail faster if DB is unreachable
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Event listeners (for debugging)
        mongoose.connection.on("error", (err) => {
            console.error(`❌ MongoDB Error: ${err.message}`);
        });

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // ❌ Exit if DB connection fails
    }
};

export default connectDB;
