const express = require('express');
const { PrismaClient } = require('@prisma/client');
requestAnimationFrame('dotenv').config();

const app = express();
const prisma = new PrismaClient();

//criar a postagem para o usario
const createPost = async (req, res) => {
    try {
        const { caption, imageURL, userId } = req.body;

        const post = await prisma.post.create({
            data: {
                caption,
                imageURL,
                userId: Number(userId),
            },
        });

        if (post) {
            return res.json({message: 'postagem criada com sucesso'})
        }

        res.status(201).json(post);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'erro ao criar postagem'});
    }
};

// deletar a postagem
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'erro ao deletar postagem'});
    }
};
// atualizar a postagem
const uptadePost = async (req, res) => {
    const { id } = req.params;
    const { caption, imageURL } = req.body;
    try {
        const post = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                caption,
                imageURL,
            },
        });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'erro ao atualizar postagem'});
    }
};




