// Simulando um "banco de dados" em memória
let users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com' }
];

const userController = {
  // GET /api/users
  getAllUsers: (req, res) => {
    try {
      res.json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar usuários'
      });
    }
  },

  // GET /api/users/:id
  getUserById: (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = users.find(u => u.id === userId);
      
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
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar usuário'
      });
    }
  },

  // POST /api/users
  createUser: (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Nome e email são obrigatórios'
        });
      }

      const newUser = {
        id: users.length + 1,
        name,
        email,
        createdAt: new Date()
      };

      users.push(newUser);

      res.status(201).json({
        success: true,
        data: newUser,
        message: 'Usuário criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao criar usuário'
      });
    }
  },

  // PUT /api/users/:id
  updateUser: (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { name, email } = req.body;
      
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }

      users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        updatedAt: new Date()
      };

      res.json({
        success: true,
        data: users[userIndex],
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar usuário'
      });
    }
  },

  // DELETE /api/users/:id - FUNÇÃO QUE ESTAVA FALTANDO
  deleteUser: (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }

      const deletedUser = users.splice(userIndex, 1)[0];

      res.json({
        success: true,
        data: deletedUser,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao deletar usuário'
      });
    }
  }
};

module.exports = userController;