const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    createPost,
    getAllPosts,
} = require('../controllers/postController');

router.post('/post/create', verifyToken, createPost);
router.get('/post/getAll', verifyToken, getAllPosts);

module.exports = router;