const calculatorController = {
  // POST /api/calculator/sum - Somar dois números
  sum: (req, res) => {
    try {
      const { num1, num2 } = req.body;

      // Validação dos parâmetros
      if (num1 === undefined || num2 === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Os parâmetros num1 e num2 são obrigatórios'
        });
      }

      // Converter para números
      const number1 = parseFloat(num1);
      const number2 = parseFloat(num2);

      // Validar se são números válidos
      if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({
          success: false,
          error: 'num1 e num2 devem ser números válidos'
        });
      }

      // Realizar a soma
      const result = number1 + number2;

      // Log da operação (em produção, usar um logger profissional)
      console.log(`🔢 Calculadora: ${number1} + ${number2} = ${result}`);

      res.json({
        success: true,
        data: {
          operation: 'soma',
          num1: number1,
          num2: number2,
          result: result,
          timestamp: new Date().toISOString()
        },
        message: `Soma realizada: ${number1} + ${number2} = ${result}`
      });

    } catch (error) {
      console.error('Erro na calculadora:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno ao processar a soma'
      });
    }
  },

  // POST /api/calculator/operations - Múltiplas operações
  multipleOperations: (req, res) => {
    try {
      const { operations } = req.body;

      if (!operations || !Array.isArray(operations)) {
        return res.status(400).json({
          success: false,
          error: 'O parâmetro "operations" deve ser um array'
        });
      }

      const results = operations.map((op, index) => {
        const { type, num1, num2 } = op;
        
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);

        if (isNaN(number1) || isNaN(number2)) {
          return {
            success: false,
            error: `Operação ${index + 1}: números inválidos`,
            operation: type
          };
        }

        let result;
        let operationSymbol;

        switch (type) {
          case 'sum':
            result = number1 + number2;
            operationSymbol = '+';
            break;
          case 'subtract':
            result = number1 - number2;
            operationSymbol = '-';
            break;
          case 'multiply':
            result = number1 * number2;
            operationSymbol = '×';
            break;
          case 'divide':
            if (number2 === 0) {
              return {
                success: false,
                error: `Operação ${index + 1}: divisão por zero`,
                operation: type
              };
            }
            result = number1 / number2;
            operationSymbol = '÷';
            break;
          default:
            return {
              success: false,
              error: `Operação ${index + 1}: tipo inválido (use: sum, subtract, multiply, divide)`,
              operation: type
            };
        }

        return {
          success: true,
          operation: type,
          expression: `${number1} ${operationSymbol} ${number2}`,
          result: result
        };
      });

      res.json({
        success: true,
        data: {
          operations: results,
          totalOperations: operations.length,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Erro nas operações múltiplas:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno ao processar as operações'
      });
    }
  },

  // GET /api/calculator/history - Histórico simples (em memória)
  getHistory: (req, res) => {
    try {
      // Em uma aplicação real, isso viria de um banco de dados
      const sampleHistory = [
        { operation: '5 + 3', result: 8, timestamp: new Date().toISOString() },
        { operation: '10 - 2', result: 8, timestamp: new Date().toISOString() },
        { operation: '4 × 2', result: 8, timestamp: new Date().toISOString() }
      ];

      res.json({
        success: true,
        data: {
          history: sampleHistory,
          total: sampleHistory.length
        },
        message: 'Histórico de operações (exemplo)'
      });

    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno ao buscar histórico'
      });
    }
  }
};

module.exports = calculatorController;