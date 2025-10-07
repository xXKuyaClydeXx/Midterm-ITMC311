// validators/application.validator.js
const Joi = require('joi');

const createApplication = Joi.object({
  id: Joi.string().optional().trim(),
  jobId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid jobId format. Must be a valid ObjectId.'
    }),
  applicantId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid applicantId format. Must be a valid ObjectId.'
    }),
  status: Joi.string()
    .valid('applied', 'interview', 'offered', 'rejected', 'hired')
    .default('applied'),
  appliedAt: Joi.date().default(Date.now)
});

const updateApplication = Joi.object({
  status: Joi.string().valid('applied', 'interview', 'offered', 'rejected', 'hired'),
}).min(1); // require at least one field to update

module.exports = {
  createApplication,
  updateApplication
};
