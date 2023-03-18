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
