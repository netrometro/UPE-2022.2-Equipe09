const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    createPost,
    getAllPosts,
    getMyPosts,
} = require('../controllers/postController');

router.post('/create', verifyToken, createPost);
router.get('/getAll', verifyToken, getAllPosts);
router.get('/myPosts', verifyToken, getMyPosts);

module.exports = router;

