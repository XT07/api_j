const { DataTypes } = require('sequelize');
const { connection } = require('../config/connection');


const Order = connection.define('Order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },

},

{
  tableName: 'orders',
  timestamps: true,
});

module.exports = Order;