const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/CategoriController');
const midleware = require('../middleware/midleware');

/**
 * @swagger
 * tags:
 * name: Orders
 * description: API para gerenciamento de pedidos
 */

/**
 * @swagger
 * /api/orders:
 * post:
 * summary: Cria um novo pedido para o usuário autenticado
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - itens
 * properties:
 * itens:
 * type: array
 * items:
 * type: object
 * required:
 * - productId
 * properties:
 * productId:
 * type: integer
 * description: ID do produto.
 * example: 1
 * amount:
 * type: integer
 * description: Quantidade do produto (padrão é 1).
 * example: 2
 * responses:
 * 201:
 * description: Pedido criado com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Order'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 500:
 * description: Erro interno do servidor.
 * get:
 * summary: Lista todos os pedidos do usuário autenticado
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de pedidos do usuário.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Order'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/orders/{id}:
 * get:
 * summary: Retorna um pedido específico pelo ID para o usuário autenticado
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID do pedido.
 * responses:
 * 200:
 * description: Dados do pedido.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Order'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Pedido não encontrado.
 * 500:
 * description: Erro interno do servidor.
 * delete:
 * summary: Cancela um pedido pelo ID para o usuário autenticado
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID do pedido.
 * responses:
 * 200:
 * description: Pedido cancelado com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Pedido cancelado
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Pedido não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */

router.post('/', midleware, OrderController.CreateOrder);
router.get('/', midleware, OrderController.ListByUser);
router.get('/:id', midleware, OrderController.SearchById);
router.delete('/:id', midleware, OrderController.CancelOrder);

module.exports = router;