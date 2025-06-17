const { DataTypes } = require('sequelize');
const { connection } = require('../config/connection');
const Order = require("./Order");
const Product = require("./Product");

const OrderProduct = connection.define('OrderProduct', {
  orderId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'orders',
      key: 'id',
    },
  },

  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },

  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

},

{
  tableName: 'OrderProduct',
  timestamps: false,
});

Order.belongsToMany(Product, {
  through: OrderProduct, // Corrigido de PedidoProduto
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products',
});

Product.belongsToMany(Order, {
  through: OrderProduct, // Corrigido de PedidoProduto
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders',
});

module.exports = OrderProduct;