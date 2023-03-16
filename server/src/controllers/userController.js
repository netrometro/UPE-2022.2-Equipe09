const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const app =  express()

const {PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

// registrar o usuário
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.json({ user });
    }   catch (error) {
        console.log(error);
        res.status(500).json({error: 'erro ao registrar usuário'})
    }
};

// login do usuário
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        });

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return res.status(401).json({message: 'senha incorreta'});
        }

        const token = jwt.sign({ userId: user.id},  process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.setHeader('Authorization', `Bearer ${token}`);
        res.json({ user, token });
    }   catch(error) {
        console.log(error);
        res.status(500).json({ error: 'erro ao efetuar login'});
    }
};

const updateUser = async (req, res) => {
    try {
        const { username, email, password, profileimageURL } = req.body;
        const { userId } = req;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username,
                email,
                password: hashedPassword,
                profileimageURL,
            },
        });

        res.json({user: updateUser});
    }   catch (error) {
        console.log(error);
        res.status(500).json({ error: 'erro ao atualizar pefil'});
    }
};
module.exports =  {
    registerUser: registerUser,
    loginUser: loginUser,
};