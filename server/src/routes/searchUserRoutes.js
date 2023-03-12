const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    searchUserByEmail,
    getUserInfo
} = require('../controllers/searchUserController');

router.get('/:email', verifyToken, searchUserByEmail);
router.get('/profile/:id', verifyToken, getUserInfo);

module.exports = router;

