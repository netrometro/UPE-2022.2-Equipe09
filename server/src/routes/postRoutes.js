const express = require('express');
const router = express.Router();

const {
    createPost,
    deletePost,
    uptadePost,
    getPostById
} = require('../controllers/postController');

router.post('/createpost', createPost);
router.delete('/:id', deletePost);
router.put('/:id', uptadePost);
router.get('/:id', getPostById);

module.exports = router;