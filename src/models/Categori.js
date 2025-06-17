const { DataTypes } = require('sequelize');
const { connection } = require('../config/connection');
const Product = require('./Product');

const Categori = connection.define('Categori', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},

{
  tableName: 'categories',
  timestamps: true,
});

Categori.hasMany(Product, { foreignKey: 'categoriId', as: 'products' });
Product.belongsTo(Categori, { foreignKey: 'categoriId', as: 'categori' });

module.exports = Categori;