import express from "express";
import { jobValidationRules } from "../validators/jobValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createJob, updateJob } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ import JWT middleware

const router = express.Router();

// ✅ Protect all job routes
// Create Job (only for logged-in users)
router.post("/", protect, jobValidationRules, validateRequest, createJob);

// Update Job (only for logged-in users)
router.put("/:id", protect, jobValidationRules, validateRequest, updateJob);

export default router;
