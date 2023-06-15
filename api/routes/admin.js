// backend routes.js
import express from "express";
import { authenticateToken, checkAdminAccess } from "../middleware/auth";


const router = express.Router();

// Protected admin route
router.get("/", authenticateToken, checkAdminAccess);
router.get("/add-product", authenticateToken, checkAdminAccess);
router.get("/products", authenticateToken, checkAdminAccess);
router.get("/products/:id", authenticateToken, checkAdminAccess);

export default router;
