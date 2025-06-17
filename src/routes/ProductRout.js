const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const middleware = require('../middleware/middleware');

router.get('/', middleware, ProductController.ListAll);
router.get('/:id', middleware, ProductController.SearchById);
router.post('/', middleware, ProductController.Create);
router.put('/:id', middleware, ProductController.Update);
router.delete('/:id', middleware, ProductController.Delet);

module.exports = router;