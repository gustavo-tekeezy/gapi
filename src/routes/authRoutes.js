const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Auth login - em desenvolvimento',
    token: 'jwt-token-simulado'
  });
});

router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Auth register - em desenvolvimento',
    data: { id: 1, email: req.body.email }
  });
});

module.exports = router;