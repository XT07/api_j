const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const midleware = require('../middleware/middleware');

router.post('/login', UserController.Login);
router.use(midleware);
router.get('/perfil', UserController.Profile);
router.put('/perfil', UserController.UpdateProfile);
router.delete('/perfil', UserController.DeletAccount);
router.put('/perfil/senha', UserController.UpdatePassword);

module.exports = router;