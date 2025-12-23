// Central entry — mounts all versions under /api 
// Single place for global API middleware (logging, auth, rate-limit)
import express from "express";
import v1Router from "./v1/index.js";

const router = express.Router();
router.use("/v1", v1Router);

export default router;