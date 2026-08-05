const express = require('express');
const settingsController = require('../controllers/settingsController');

const router = express.Router();

// ── Public (no auth required) ───────────────────────────────────────────────
router.get('/public', settingsController.getPublicSettings);

module.exports = router;
