const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    searchUserByUsername,
    getUserInfo
} = require('../controllers/searchUserController');

router.get('/:username', verifyToken, searchUserByUsername);
router.get('/profile/:id', verifyToken, getUserInfo);

module.exports = router;

