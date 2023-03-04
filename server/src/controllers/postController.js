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
// aqui vai ser criado apenas uma rota para buscar as postagens pelo o id, um get, algo que faltou no userController.js, o que dificultou um pouco para saber se as coisas estavam funcionando ou não
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({error: 'postagem não foi encontrada pelo sistema'});
        }
    }   catch (error) {
        console.error(error);
        res.status(500).json({error: "erro ao buscar postagem"});
    }
};

module.exports = {
    createPost,
    deletePost,
    uptadePost,
    getPostById,
}






