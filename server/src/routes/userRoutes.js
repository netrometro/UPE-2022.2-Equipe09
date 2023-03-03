const express = require('express');
const router =  express.Router();

const {
    registerUser,
    loginUser,
    updateUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users/uptade/:id', updateUser);

module.exports = router;