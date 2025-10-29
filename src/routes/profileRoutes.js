const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.createProfile);
router.get('/user/:userId', profileController.getProfileByUserId);
router.put('/user/:userId', profileController.updateProfile);
router.delete('/user/:userId', profileController.deleteProfile);

module.exports = router;