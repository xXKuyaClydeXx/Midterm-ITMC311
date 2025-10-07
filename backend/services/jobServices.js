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

export const updateJobService = async (id, jobData) => {
  try {
    const job = await Job.findByIdAndUpdate(id, jobData, {
      new: true, 
      runValidators: true, 
    });

    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  } catch (error) {
    throw new Error("Error updating job: " + error.message);
  }
};

export const deleteJobService = async (id) => {
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  } catch (error) {
    throw new Error("Error deleting job: " + error.message);
  }
};