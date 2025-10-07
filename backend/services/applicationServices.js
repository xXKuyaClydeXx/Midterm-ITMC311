// services/application.service.js
const Application = require('../models/Application');

/**
 * Submit a new job application
 * Automatically prevents duplicates (same applicant & job)
 */
async function submitApplication({ id, jobId, applicantId, status, appliedAt }) {
  // Check if applicant already applied for this job
  const existing = await Application.findOne({ jobId, applicantId });
  if (existing) {
    throw new Error('You have already applied for this job.');
  }

  // Create new application
  const application = new Application({
    id, // optional; schema auto-generates if not provided
    jobId,
    applicantId,
    status: status || 'applied',
    appliedAt: appliedAt || Date.now()
  });

  // Save to DB
  const saved = await application.save();
  return saved;
}

/**
 * Retrieve a single application by ID
 */
async function getApplicationById(id) {
  return Application.findById(id).exec();
}

/**
 * List all applications (optionally filter by applicant, job, or status)
 */
async function listApplications(filter = {}) {
  return Application.find(filter).sort({ appliedAt: -1 }).exec();
}

/**
 * Update application status
 */
async function updateApplicationStatus(id, status) {
  return Application.findByIdAndUpdate(id, { status }, { new: true }).exec();
}

module.exports = {
  submitApplication,
  getApplicationById,
  listApplications,
  updateApplicationStatus
};
