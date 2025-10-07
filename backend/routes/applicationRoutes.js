const express = require('express');
const router = express.Router();
const controller = require('../controllers/application.controller');
const { createApplication, updateApplication } = require('../validators/application.validator');
const validator = require('express-joi-validation').createValidator({});

// POST — Submit new application
router.post('/', validator.body(createApplication), controller.create);

// GET — List all or single application
router.get('/', controller.list);
router.get('/:id', controller.getOne);

// PUT — Update application status
router.put('/:id/status', validator.body(updateApplication), controller.updateStatus);

module.exports = router;