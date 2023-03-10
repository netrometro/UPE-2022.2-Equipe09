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
/*         if(user) {
            return res.json({message: 'usuário criado com sucesso!!!'})
        } */

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);

        res.json({user, token});
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

        if(user) {
            return res.json({message: 'usuário logado'});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return res.status(401).json({message: 'senha incorreta'});
        }

        const token = jwt.sign({ userId: user.id},  process.env.JWT_SECRET);

        res.json({ user, token });
    }   catch(error) {
        console.log(error);
        res.status(500).json({ error: 'erro ao efetuar login'});
    }
};

// atualizar o usuário
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const hashedPassword = password? await bcrypt.hash(password, 10): undefined;

        const user = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.json(user);
    }   catch(error) {
        console.error(error);
        res.status(500).json({ error: 'erro ao atualizar usuário'});
    }
};

// deletar o usuário
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(user);
    }   catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erro ao deletar usuário'});
    }
};

module.exports =  {
    registerUser: registerUser,
    loginUser: loginUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};