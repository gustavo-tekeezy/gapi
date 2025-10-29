const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users - Listar todos usuários
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Buscar usuário por ID
router.get('/:id', userController.getUserById);

// POST /api/users - Criar novo usuário
router.post('/', userController.createUser);

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;