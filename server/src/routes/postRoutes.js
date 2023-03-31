const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    updatePost
} = require('../controllers/postController');

const {
    addComment,
    getAllComments,
} = require('../controllers/commentController');

router.post('/create', verifyToken, createPost);
router.get('/getAll', verifyToken, getAllPosts);
router.get('/myPosts', verifyToken, getMyPosts);
router.get('/seePost/:id', verifyToken, getPostById);
router.put('/update/:id', verifyToken, updatePost);
router.post('/seePost/:id/comment', verifyToken, addComment);
router.get('/seePost/:id/comments', verifyToken, getAllComments);

module.exports = router;

