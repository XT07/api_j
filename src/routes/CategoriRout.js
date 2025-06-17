const express = require('express');
const router = express.Router();
const CategoriController = require('../controllers/CategoriController');
const midleware = require('../middleware/midleware');

/**
 * @swagger
 * tags:
 * name: Categories
 * description: API para gerenciamento de categorias de produtos
 */

/**
 * @swagger
 * /api/categories:
 * get:
 * summary: Retorna a lista de todas as categorias
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Uma lista de categorias.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Category'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 500:
 * description: Erro interno do servidor.
 * post:
 * summary: Cria uma nova categoria
 * tags: [Categories]
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
 * properties:
 * name:
 * type: string
 * description: Nome da categoria.
 * example: Eletrônicos
 * responses:
 * 201:
 * description: Categoria criada com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Category'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/categories/{id}:
 * get:
 * summary: Retorna uma categoria específica pelo ID
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID da categoria.
 * responses:
 * 200:
 * description: Dados da categoria.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Category'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Categoria não encontrada.
 * 500:
 * description: Erro interno do servidor.
 * put:
 * summary: Atualiza uma categoria existente pelo ID
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID da categoria.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * description: Novo nome da categoria.
 * example: Eletrodomésticos
 * responses:
 * 200:
 * description: Categoria atualizada com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Category'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Categoria não encontrada.
 * 500:
 * description: Erro interno do servidor.
 * delete:
 * summary: Deleta uma categoria pelo ID
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID da categoria.
 * responses:
 * 200:
 * description: Categoria deletada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Categoria deletada :)
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Categoria não encontrada.
 * 409:
 * description: Conflito, a categoria possui produtos vinculados e não pode ser deletada.
 * 500:
 * description: Erro interno do servidor.
 */

router.get('/', midleware, CategoriController.ListAll);
router.get('/:id', midleware, CategoriController.SearchForId);
router.post('/', midleware, CategoriController.Create);
router.put('/:id', midleware, CategoriController.Update);
router.delete('/:id', midleware, CategoriController.Delet);

module.exports = router;