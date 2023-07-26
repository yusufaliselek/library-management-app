// Init router
import express from "express";
import { getPartImageById } from "../controllers/partImages.js";

const router = express.Router();

router.get("/:id", getPartImageById);

export default router;

