const express = require('express');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

// ── Public (no auth required) ───────────────────────────────────────────────
router.post('/subscribe', newsletterController.subscribe);

module.exports = router;
