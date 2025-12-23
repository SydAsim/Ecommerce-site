import express from "express";
import connectdb  from "./src/infrastructure/config/database.js"
import dotenv from "dotenv"
import cors from "cors"
import router from "./src/interfaces/routes/index.js";

import { errorHandler } from "./src/infrastructure/utils/errorHandler.js";  


dotenv.config({
    path:'./env'
})



const app = express()

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", time: new Date().toISOString() });
});

// API routes
app.use("/api", router);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

// Connect to DB first
await connectdb(); // ← Use your existing function (await because it's async)

// Start server only after DB is connected
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API ready at http://localhost:${PORT}/api/v1/auth/register`);
});