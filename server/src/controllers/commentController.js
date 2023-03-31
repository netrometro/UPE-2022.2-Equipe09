const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addComment = async (req, res) => {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.userId;

    try {
        const comment = await prisma.comment.create({
            data: {
                text,
                userId,
                postId: parseInt(postId),
            },
            select: {
                id: true,
                text: true,
                createAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });

        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'erro ao criar comentário'});
    }
};

module.exports = {
    addComment,
};

