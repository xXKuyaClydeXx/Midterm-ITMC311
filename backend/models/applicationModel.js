// models/Application.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offered', 'rejected', 'hired'],
    default: 'applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate applications per applicant/job pair (optional)
ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

// Optional: generate id automatically if not provided
ApplicationSchema.pre('validate', function (next) {
  if (!this.id) {
    // Create a simple unique identifier (e.g., "APP-20251007-xxxxx")
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.id = `APP-${date}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Application', ApplicationSchema);
