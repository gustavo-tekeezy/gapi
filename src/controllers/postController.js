const prisma = require('../config/database');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json({
        success: true,
        data: posts,
        total: posts.length
      });
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  getPostsByUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      const posts = await prisma.post.findMany({
        where: { authorId: userId },
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json({
        success: true,
        data: posts,
        total: posts.length
      });
    } catch (error) {
      console.error('Erro ao buscar posts do usuário:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content, published, authorId } = req.body;

      if (!title || !authorId) {
        return res.status(400).json({
          success: false,
          error: 'Título e authorId são obrigatórios'
        });
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          published: published || false,
          authorId: parseInt(authorId)
        },
        include: {
          author: {
            include: {
              profile: true
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        data: post,
        message: 'Post criado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2003') {
        return res.status(404).json({
          success: false,
          error: 'Autor não encontrado'
        });
      }
      
      console.error('Erro ao criar post:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const { title, content, published } = req.body;

      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title,
          content,
          published
        },
        include: {
          author: {
            include: {
              profile: true
            }
          }
        }
      });

      res.json({
        success: true,
        data: updatedPost,
        message: 'Post atualizado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Post não encontrado'
        });
      }
      
      console.error('Erro ao atualizar post:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = parseInt(req.params.id);

      await prisma.post.delete({
        where: { id: postId }
      });

      res.json({
        success: true,
        message: 'Post deletado com sucesso'
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Post não encontrado'
        });
      }
      
      console.error('Erro ao deletar post:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = postController;