const prisma = require('../config/database');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
          posts: true
        }
      });

      res.json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
          posts: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Nome e email são obrigatórios'
        });
      }

      const newUser = await prisma.user.create({
        data: {
          name,
          email
        },
        include: {
          profile: true,
          posts: true
        }
      });

      res.status(201).json({
        success: true,
        data: newUser,
        message: 'Usuário criado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          error: 'Email já cadastrado'
        });
      }
      
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { name, email } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          email
        },
        include: {
          profile: true,
          posts: true
        }
      });

      res.json({
        success: true,
        data: updatedUser,
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);

      await prisma.user.delete({
        where: { id: userId }
      });

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = userController;