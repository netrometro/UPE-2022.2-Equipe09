const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { caption, imageURL } = req.body;
  const userId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        caption,
        imageURL,
        userId
      }
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                user: {
                    select: {
                        username: true,
                        email: true
                    },
                },
                caption: true,
                imageURL: true,
                createAt: true,
            },
        });
        res.status(200).json(posts);
    }   catch (error) {
        console.log(error);
        res.status(500).json({ error: 'erro ao buscar posts'});
    }
};

module.exports = {
  createPost,
  getAllPosts,
};