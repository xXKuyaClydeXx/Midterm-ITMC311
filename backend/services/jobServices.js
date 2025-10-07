import Job from "../models/Job.js";

// Create Job (already done)
export const createJobService = async (jobData) => {
  try {
    const job = new Job(jobData);
    await job.save();
    return job;
  } catch (error) {
    throw new Error("Error creating job: " + error.message);
  }
};

// Update Job
export const updateJobService = async (id, jobData) => {
  try {
    const job = await Job.findByIdAndUpdate(id, jobData, {
      new: true, // return updated doc
      runValidators: true, // run schema validators
    });

    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  } catch (error) {
    throw new Error("Error updating job: " + error.message);
  }
};

// Delete Job
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
