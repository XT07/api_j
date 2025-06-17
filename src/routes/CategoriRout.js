const express = require('express');
const router = express.Router();
const CategoriController = require('../controllers/CategoriController');
const midleware = require('../middleware/midleware');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento das categorias
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Busca categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *       404:
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       409:
 *         description: "Não é possível deletar: existem produtos vinculados"
 */

router.get('/', authMiddleware, categoriaController.listarTodas);
router.get('/:id', authMiddleware, categoriaController.buscarPorId);
router.post('/', authMiddleware, categoriaController.criar);
router.put('/:id', authMiddleware, categoriaController.atualizar);
router.delete('/:id', authMiddleware, categoriaController.deletar);

module.exports = router;