require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/connection");
const UsersRoutes = require('./routes/UsersRoutes');
const CategoriesRoutes = require('./routes/CategoriesRoutes');
const ProductsRoutes = require('./routes/ProductsRoutes');
const OrdersRoutes = require('./routes/OrdersRoutes');

//verificando a conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log(`Conexão estabelecida com o banco de dados`);
    }).catch(err => {
        console.log(`Erro ao tentar se conectar com o banco de dados | err | ${err}`);
    })

//config do app
app.use(cors());
app.use(express.json());

const {
    User,
    Categori,
    Product,
    Order,
    OrderProduct
} = require('./models');

const {
    SwaggerUi,
    SwaggerSpec
} = require('./docs/swagger');

app.use('/api-documentation', SwaggerUi.serve, SwaggerUi.setup(SwaggerSpec)); //rota para a documentação da API
app.use('/api/users', UsersRoutes);
app.use('/api/categories', CategoriesRoutes);
app.use('/api/products', ProductsRoutes);
app.use('/api/orders', OrdersRoutes);

//iniciando a API
app.listen(3030, () => {
    console.log("API rodando");
})