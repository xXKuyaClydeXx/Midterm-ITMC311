// controllers/application.controller.js
const service = require('../services/application.service');

/**
 * ✅ POST /api/applications
 * Submit a new application
 */
async function create(req, res, next) {
  try {
    const created = await service.submitApplication(req.body);
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

/**
 * ✅ GET /api/applications
 * List all applications (optional filters)
 */
async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.jobId) filter.jobId = req.query.jobId;
    if (req.query.applicantId) filter.applicantId = req.query.applicantId;
    if (req.query.status) filter.status = req.query.status;

    const apps = await service.listApplications(filter);
    return res.json(apps);
  } catch (err) {
    next(err);
  }
}

/**
 * ✅ GET /api/applications/:id
 * Get one application by ID
 */
async function getOne(req, res, next) {
  try {
    const app = await service.getApplicationById(req.params.id);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.json(app);
  } catch (err) {
    next(err);
  }
}

/**
 * ✅ PUT /api/applications/:id/status
 * Update application status
 */
async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const updated = await service.updateApplicationStatus(req.params.id, status);
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  list,
  getOne,
  updateStatus
};
