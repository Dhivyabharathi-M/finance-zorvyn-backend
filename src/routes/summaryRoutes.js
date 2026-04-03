const express = require('express');
const { getSummary } = require('../controllers/summaryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('analyst'), getSummary);

module.exports = router;