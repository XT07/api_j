const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Atividade JS',
    version: '1.0.0',
    description: 'Documentação da API RESTful com Express, Sequelize e JWT',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3030}`,
      description: 'Servidor de Desenvolvimento',
    },
  ],
  tags: [
    { name: 'Users', description: 'Operações de Usuários e Autenticação' },
    { name: 'Categories', description: 'Operações com Categorias' },
    { name: 'Products', description: 'Operações com Produtos' },
    { name: 'Orders', description: 'Operações com Pedidos' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          price: { type: 'number', format: 'float' },
          categoriId: { type: 'integer' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/Product' },
          },
        },
      },
    },
  },
  paths: {
    '/api/users/cadastro': {
      post: {
        tags: ['Users'],
        summary: 'Registra um novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'João Silva' },
                  email: { type: 'string', format: 'email', example: 'joao.silva@example.com' },
                  password: { type: 'string', format: 'password', example: 'SenhaSegura123' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Usuário registrado com sucesso' },
          '409': { description: 'E-mail já cadastrado' },
        },
      },
    },
    '/api/users/login': {
      post: {
        tags: ['Users'],
        summary: 'Autentica um usuário e retorna um token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Login bem-sucedido' },
          '401': { description: 'Credenciais inválidas' },
        },
      },
    },
    '/api/users/perfil': {
      get: {
        tags: ['Users'],
        summary: 'Retorna o perfil do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
          '401': { description: 'Não autorizado' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Atualiza o perfil do usuário autenticado',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Perfil atualizado' },
          '401': { description: 'Não autorizado' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Deleta a conta do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Conta deletada com sucesso' },
          '401': { description: 'Não autorizado' },
        },
      },
    },
    '/api/users/perfil/senha': {
      put: {
        tags: ['Users'],
        summary: 'Atualiza a senha do usuário autenticado',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['OldPass', 'NewPass'],
                properties: {
                  OldPass: { type: 'string', format: 'password' },
                  NewPass: { type: 'string', format: 'password' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Senha atualizada' },
          '401': { description: 'Senha antiga incorreta' },
        },
      },
    },
    '/api/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Lista todas as categorias',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de categorias',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } },
          },
        },
      },
      post: {
        tags: ['Categories'],
        summary: 'Cria uma nova categoria',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', required: ['name'], properties: { name: { type: 'string' } } },
            },
          },
        },
        responses: { '201': { description: 'Categoria criada' } },
      },
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Busca uma categoria por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Categoria não encontrada' } },
      },
      put: {
        tags: ['Categories'],
        summary: 'Atualiza uma categoria por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } } },
            },
          },
        },
        responses: { '200': { description: 'Categoria atualizada' }, '404': { description: 'Categoria não encontrada' } },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Deleta uma categoria por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Categoria deletada' },
          '404': { description: 'Categoria não encontrada' },
          '409': { description: 'Conflito - Categoria possui produtos' },
        },
      },
    },
    '/api/products': {
      get: {
        tags: ['Products'],
        summary: 'Lista todos os produtos',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de produtos',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } },
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Cria um novo produto',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'price', 'categoriId'],
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number', format: 'float' },
                  categoriId: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: { '201': { description: 'Produto criado' } },
      },
    },
    '/api/products/{id}': {
        get: {
            tags: ['Products'],
            summary: 'Busca um produto por ID',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' }, '404': { description: 'Produto não encontrado' } },
        },
        put: {
            tags: ['Products'],
            summary: 'Atualiza um produto por ID',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      price: { type: 'number', format: 'float' },
                      categoriId: { type: 'integer' },
                    },
                  },
                },
              },
            },
            responses: { '200': { description: 'Produto atualizado' }, '404': { description: 'Produto não encontrado' } },
        },
        delete: {
            tags: ['Products'],
            summary: 'Deleta um produto por ID',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: {
              '200': { description: 'Produto deletado' },
              '404': { description: 'Produto não encontrado' },
              '409': { description: 'Conflito - Produto está em pedidos' },
            },
        },
    },
    // Rotas de Pedidos
    '/api/orders': {
        get: {
            tags: ['Orders'],
            summary: 'Lista os pedidos do usuário',
            security: [{ bearerAuth: [] }],
            responses: { '200': { description: 'OK' } },
        },
        post: {
            tags: ['Orders'],
            summary: 'Cria um novo pedido',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['itens'],
                            properties: {
                                itens: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['productId'],
                                        properties: {
                                            productId: { type: 'integer' },
                                            amount: { type: 'integer' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: { '201': { description: 'Pedido criado' } },
        }
    },
    '/api/orders/{id}': {
        get: {
            tags: ['Orders'],
            summary: 'Busca um pedido por ID',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' }, '404': { description: 'Pedido não encontrado' } },
        },
        delete: {
            tags: ['Orders'],
            summary: 'Cancela um pedido por ID',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: { '200': { description: 'Pedido cancelado' }, '404': { description: 'Pedido não encontrado' } },
        }
    }
  },
};

const options = {
  swaggerDefinition,
  apis: [], 
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');

module.exports = { swaggerUi, swaggerSpec };