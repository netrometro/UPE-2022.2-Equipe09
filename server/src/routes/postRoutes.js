const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
} = require('../controllers/postController');

router.post('/create', verifyToken, createPost);
router.get('/getAll', verifyToken, getAllPosts);
router.get('/myPosts', verifyToken, getMyPosts);
router.get('/seePost/:id', verifyToken, getPostById);

module.exports = router;

