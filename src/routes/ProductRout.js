const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const midleware = require('../middleware/midleware');

/**
 * @swagger
 * tags:
 * name: Products
 * description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
 * get:
 * summary: Retorna a lista de todos os produtos
 * tags: [Products]
 * responses:
 * 200:
 * description: Uma lista de produtos.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Product'
 * 500:
 * description: Erro interno do servidor.
 * post:
 * summary: Cria um novo produto
 * tags: [Products]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - price
 * - categoriId
 * properties:
 * name:
 * type: string
 * description: Nome do produto.
 * example: Smartphone
 * price:
 * type: number
 * format: float
 * description: Preço do produto.
 * example: 999.99
 * categoriId:
 * type: integer
 * description: ID da categoria do produto.
 * example: 1
 * responses:
 * 201:
 * description: Produto criado com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/products/{id}:
 * get:
 * summary: Retorna um produto específico pelo ID
 * tags: [Products]
 * responses:
 * 200:
 * description: Dados do produto.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * 404:
 * description: Produto não encontrado.
 * 500:
 * description: Erro interno do servidor.
 * put:
 * summary: Atualiza um produto existente pelo ID
 * tags: [Products]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID do produto.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * description: Novo nome do produto.
 * example: Smartwatch
 * price:
 * type: number
 * format: float
 * description: Novo preço do produto.
 * example: 299.99
 * categoriId:
 * type: integer
 * description: Novo ID da categoria do produto.
 * example: 2
 * responses:
 * 200:
 * description: Produto atualizado com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Produto não encontrado.
 * 500:
 * description: Erro interno do servidor.
 * delete:
 * summary: Deleta um produto pelo ID
 * tags: [Products]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID do produto.
 * responses:
 * 200:
 * description: Produto deletado com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Produto deletado
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Produto não encontrado.
 * 409:
 * description: Conflito, o produto possui pedidos ativos e não pode ser deletado.
 * 500:
 * description: Erro interno do servidor.
 */

router.get('/', midleware, ProductController.ListAll);
router.get('/:id', midleware, ProductController.SearchById);
router.post('/', midleware, ProductController.Create);
router.put('/:id', midleware, ProductController.Update);
router.delete('/:id', midleware, ProductController.Delet);

module.exports = router;