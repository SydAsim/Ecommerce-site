// Groups all v1 routes Keeps current code in /v1 — when we add v2 later, no breaking changes for clients
import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();
router.use("/auth", authRoutes);

export default router;