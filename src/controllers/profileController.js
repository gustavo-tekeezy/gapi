const prisma = require('../config/database');

const profileController = {
  createProfile: async (req, res) => {
    try {
      const { bio, avatar, userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'userId é obrigatório'
        });
      }

      const profile = await prisma.profile.create({
        data: {
          bio,
          avatar,
          userId: parseInt(userId)
        },
        include: {
          user: true
        }
      });

      res.status(201).json({
        success: true,
        data: profile,
        message: 'Perfil criado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          error: 'Usuário já possui um perfil'
        });
      }
      
      if (error.code === 'P2003') {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      console.error('Erro ao criar perfil:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  getProfileByUserId: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      const profile = await prisma.profile.findUnique({
        where: { userId },
        include: {
          user: true
        }
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Perfil não encontrado'
        });
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { bio, avatar } = req.body;

      const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          bio,
          avatar
        },
        include: {
          user: true
        }
      });

      res.json({
        success: true,
        data: updatedProfile,
        message: 'Perfil atualizado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Perfil não encontrado'
        });
      }
      
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      await prisma.profile.delete({
        where: { userId }
      });

      res.json({
        success: true,
        message: 'Perfil deletado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Perfil não encontrado'
        });
      }
      
      console.error('Erro ao deletar perfil:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = profileController;