import express from "express";
import { jobValidationRules } from "../validators/jobValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createJob, updateJob } from "../controllers/jobController.js";
import { createJob } from "../controllers/jobController.js";

const router = express.Router();

// Create job
router.post("/", jobValidationRules, validateRequest, createJob);

// Update job
router.put("/:id", jobValidationRules, validateRequest, updateJob);

export default router;
