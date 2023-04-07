const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        
        const user = await prisma.user.findMany({
            where: { 
                username: username,
            },
        });

        if(!user) {
            return res.status(401).json({ message: 'usuário não encontrado'});
        }
        res.status(200).json({user});
    }   catch (error) {
        console.log(error);
        res.status(500).json({ error: 'erro interno no servidor'});
    }
};

const getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { 
                id: parseInt(id),
            },
            select: {
                username: true,
                profileimageURL: true
            },
        });
        res.status(200).json(user);
    }   catch (error) {
        console.log(error);
        res.status(500).json({ error: 'erro ao buscar usuário'})
    }
};

module.exports = {
    searchUserByUsername,
    getUserInfo,
}