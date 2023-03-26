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

const getMyPosts = async (req, res) => {
  const userId = req.userId;

  try {
    const myPosts = await prisma.post.findMany({
      where: {
        userId,
      },
      select: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        id: true,
        caption: true,
        imageURL: true,
        createAt: true,
      },
    });
    res.status(200).json(myPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar posts do usuário' });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  
  try {
    console.log(postId);
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      select: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        caption: true,
        imageURL: true,
        createAt: true,
      },
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar postagem' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  getPostById,
};

