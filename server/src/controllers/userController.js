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
        if(user) {
            return res.json({message: 'usuário cirado com sucesso!!!'})
        }

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);

        res.json({user, token});
    }   catch (error) {
        console.log(error);
        res.status(500).json({error: 'erro ao registrar usuário'})
    }
};