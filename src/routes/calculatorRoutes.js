const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

// POST /api/calculator/sum - Somar dois números
router.post('/sum', calculatorController.sum);

// POST /api/calculator/operations - Múltiplas operações
router.post('/operations', calculatorController.multipleOperations);

// GET /api/calculator/history - Histórico de operações
router.get('/history', calculatorController.getHistory);

module.exports = router;