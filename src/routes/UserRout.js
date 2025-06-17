const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const midleware = require('../middleware/midleware');

/**
 * @swagger
 * tags:
 * name: Users
 * description: API para gerenciamento de usuários e autenticação
 */

/**
 * @swagger
 * /api/users/register:
 * post:
 * summary: Registra um novo usuário
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * properties:
 * name:
 * type: string
 * description: Nome do usuário.
 * example: João Silva
 * email:
 * type: string
 * format: email
 * description: E-mail do usuário (deve ser único).
 * example: joao.silva@example.com
 * password:
 * type: string
 * format: password
 * description: Senha do usuário.
 * example: SenhaSegura123
 * responses:
 * 201:
 * description: Usuário registrado com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * example: 1
 * name:
 * type: string
 * example: João Silva
 * email:
 * type: string
 * example: joao.silva@example.com
 * token:
 * type: string
 * description: Token JWT para autenticação.
 * 409:
 * description: E-mail já cadastrado.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/users/login:
 * post:
 * summary: Autentica um usuário e retorna um token JWT
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * format: email
 * description: E-mail do usuário.
 * example: joao.silva@example.com
 * password:
 * type: string
 * format: password
 * description: Senha do usuário.
 * example: SenhaSegura123
 * responses:
 * 200:
 * description: Login bem-sucedido.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * description: Token JWT para autenticação.
 * 401:
 * description: Credenciais inválidas.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/users/profile:
 * get:
 * summary: Retorna o perfil do usuário autenticado
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Dados do perfil do usuário.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 * put:
 * summary: Atualiza o perfil do usuário autenticado
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * description: Novo nome do usuário.
 * example: João Pedro
 * email:
 * type: string
 * format: email
 * description: Novo e-mail do usuário.
 * example: joao.pedro@example.com
 * responses:
 * 200:
 * description: Perfil atualizado com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/users/update-password:
 * put:
 * summary: Atualiza a senha do usuário autenticado
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - OldPass
 * - NewPass
 * properties:
 * OldPass:
 * type: string
 * format: password
 * description: Senha antiga do usuário.
 * example: SenhaAntiga123
 * NewPass:
 * type: string
 * format: password
 * description: Nova senha do usuário.
 * example: NovaSenhaSegura456
 * responses:
 * 200:
 * description: Senha atualizada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Senha atualizada
 * 401:
 * description: Não autorizado, token inválido, não fornecido ou senha antiga incorreta.
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/users/delete-account:
 * delete:
 * summary: Deleta a conta do usuário autenticado
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Conta deletada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Conta deletada
 * 401:
 * description: Não autorizado, token inválido ou não fornecido.
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */


router.post('/cadastro', userController.Register);
router.post('/login', userController.login);
router.use(midleware);
router.get('/perfil', UserController.Profile);
router.put('/perfil', UserController.UpdateProfile);
router.put('/perfil/senha', UserController.UpdatePassword);
router.delete('/perfil', UserController.DeletAccount);

module.exports = router;