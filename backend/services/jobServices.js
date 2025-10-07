import Job from "../models/Job.js";

export const createJobService = async (jobData) => {
  try {
    const job = new Job(jobData);
    await job.save();
    return job;
  } catch (error) {
    throw new Error("Error creating job: " + error.message);
  }
};