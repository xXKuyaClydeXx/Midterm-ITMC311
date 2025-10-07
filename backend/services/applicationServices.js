// services/application.service.js
const Application = require('../models/Application');
const Job = require('../models/Job');

/**
 * Submit a new job application
 */
async function submitApplication({ id, jobId, applicantId, status, appliedAt }) {
  // 1. Check if the job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found.');
  }

  // 2. Check if the job deadline has passed
  const now = new Date();
  if (job.deadline && now > job.deadline) {
    throw new Error('You cannot apply after the job deadline.');
  }

  // 3. Check if the applicant already applied
  const existing = await Application.findOne({ jobId, applicantId });
  if (existing) {
    throw new Error('You have already applied for this job.');
  }

  // 4. Create the new application
  const application = new Application({
    id,
    jobId,
    applicantId,
    status: status || 'applied',
    appliedAt: appliedAt || Date.now()
  });

  // 5. Save and return
  const saved = await application.save();
  return saved;
}

/**
 * Get application by MongoDB _id
 */
async function getApplicationById(id) {
  return Application.findById(id).exec();
}

/**
 * List all applications
 */
async function listApplications(filter = {}) {
  return Application.find(filter).sort({ appliedAt: -1 }).exec();
}

/**
 * Update application status
 */
async function updateApplicationStatus(id, newStatus) {
  const allowedStatuses = ['applied', 'interview', 'offered', 'rejected', 'hired'];
  if (!allowedStatuses.includes(newStatus)) {
    throw new Error(`Invalid status. Allowed values: ${allowedStatuses.join(', ')}`);
  }

  const updated = await Application.findOneAndUpdate(
    { $or: [{ _id: id }, { id }] },
    { status: newStatus },
    { new: true }
  );

  if (!updated) {
    throw new Error('Application not found.');
  }

  return updated;
}

module.exports = {
  submitApplication,
  getApplicationById,
  listApplications,
  updateApplicationStatus
};
