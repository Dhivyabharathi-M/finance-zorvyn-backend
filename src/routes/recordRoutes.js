const express = require('express');
const { createRecord, getRecords, updateRecord, deleteRecord } = require('../controllers/recordController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('analyst'), createRecord);
router.get('/', authMiddleware, getRecords);
router.put('/:id', authMiddleware, roleMiddleware('analyst'), updateRecord);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteRecord);

module.exports = router;