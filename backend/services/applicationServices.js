// services/application.service.js
const Application = require('../models/Application');

/**
 * Submit a new job application
 */
async function submitApplication({ id, jobId, applicantId, status, appliedAt }) {
  const existing = await Application.findOne({ jobId, applicantId });
  if (existing) {
    throw new Error('You have already applied for this job.');
  }

  const application = new Application({
    id,
    jobId,
    applicantId,
    status: status || 'applied',
    appliedAt: appliedAt || Date.now()
  });

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
 * List all applications (filter optional)
 */
async function listApplications(filter = {}) {
  return Application.find(filter).sort({ appliedAt: -1 }).exec();
}

/**
 * ✅ Update application status
 * 
 * @param {String} id - MongoDB _id or custom application id
 * @param {String} newStatus - New status value
 * @returns {Object} Updated application
 */
async function updateApplicationStatus(id, newStatus) {
  // Check if valid status
  const allowedStatuses = ['applied', 'interview', 'offered', 'rejected', 'hired'];
  if (!allowedStatuses.includes(newStatus)) {
    throw new Error(`Invalid status. Allowed values: ${allowedStatuses.join(', ')}`);
  }

  // Find and update application
  const updated = await Application.findOneAndUpdate(
    { $or: [{ _id: id }, { id }] }, // can use _id or custom id
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
