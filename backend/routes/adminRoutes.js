const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/login', adminController.login);
router.post('/create', adminController.createAdmin); // Should be protected in production

// Protected routes
router.get('/profile', verifyToken, adminController.getProfile);

module.exports = router;
