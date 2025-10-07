import { createJobService, updateJobService, deleteJobService } from "../services/jobService.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const jobData = {
      title: req.body.title,
      description: req.body.description,
      postedBy: req.user?.id || req.body.postedBy, // assumes you add user via auth
      deadline: req.body.deadline,
    };

    const job = await createJobService(jobData);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
    };

    const job = await updateJobService(jobId, jobData);
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await deleteJobService(jobId);
    res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
