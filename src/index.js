require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/connection");
const CategoriRout = require('./routes/CategoriRout');
const OrderRout = require('./routes/OrderRout');
const UserRout = require('./routes/UserRout');
const ProductRout = require('./routes/ProductRout');

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
app.use('/api/categories', CategoriRout);
app.use('/api/orders', OrderRout);
app.use('/api/users', UserRout);
app.use('/api/products', ProductRout);

//iniciando a API
app.listen(3030, () => {
    console.log("API rodando");
})