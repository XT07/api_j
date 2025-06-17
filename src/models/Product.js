const { DataTypes } = require('sequelize');
const { connection } = require('../config/connection');

const Product = connection.define('Product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  categoriId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },

},

{
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;