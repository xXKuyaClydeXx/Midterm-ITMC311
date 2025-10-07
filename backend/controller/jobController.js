import { createJobService } from "../services/jobService.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    // jobData comes from validated request body
    const jobData = {
      title: req.body.title,
      description: req.body.description,
      postedBy: req.user?.id || req.body.postedBy, // if you attach user via auth
      deadline: req.body.deadline,
    };

    const job = await createJobService(jobData);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
