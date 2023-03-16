const express = require('express');
const router =  express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    updateUser,
    getMe,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/updateprofile', verifyToken, updateUser);
router.get('/me', verifyToken, getMe);

module.exports = router;