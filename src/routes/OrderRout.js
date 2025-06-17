const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const midleware = require('../middleware/middleware');


router.post('/', midleware, OrderController.CreateOrder);
router.get('/', midleware, OrderController.ListByUser);
router.get('/:id', midleware, OrderController.SearchById);
router.delete('/:id', midleware, OrderController.CancelOrder);

module.exports = router;