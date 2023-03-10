const express = require('express');
const router = express.Router();

const {
    createPost,
    deletePost,
    uptadePost,
    getPostById
} = require('../controllers/postController');

router.post('/create', createPost);
router.delete('/:id', deletePost);
router.put('/:id', uptadePost);

module.exports = router;