const express = require('express');
const { register, login, getUsers, updateUserRole, updateUserStatus } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, roleMiddleware('admin'), getUsers);
router.patch('/:id/role', authMiddleware, roleMiddleware('admin'), updateUserRole);
router.patch('/:id/status', authMiddleware, roleMiddleware('admin'), updateUserStatus);

module.exports = router;