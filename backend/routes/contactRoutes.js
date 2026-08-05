const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

// ── Public (no auth required) ───────────────────────────────────────────────
router.post('/', contactController.createContact);

module.exports = router;
