const express = require('express');
const router = express.Router();
const CategoriController = require('../controllers/CategoriController');
const midleware = require('../middleware/middleware');


router.get('/', midleware, CategoriController.ListAll);
router.get('/:id', midleware, CategoriController.SearchById);
router.post('/', midleware, CategoriController.Create);
router.put('/:id', midleware, CategoriController.Update);
router.delete('/:id', midleware, CategoriController.Delet);

module.exports = router;