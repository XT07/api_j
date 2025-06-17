const Order = require('../models/Order'); // Corrigido de 'order' para 'Order'
const product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');

exports.CreateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itens } = req.body;

    const newOrder = await Order.create({ userId }); // Corrigido

    const orderProdut = itens.map(i => ({
      orderId: newOrder.id, // Corrigido 'orserId' e a referência do id
      productId: i.productId,
      amount: i.amount || 1,
    }));
    await OrderProduct.bulkCreate(orderProdut);

    const createdOrder = await Order.findByPk(newOrder.id, { // Corrigido
      include: [{
        model: product,
        as: 'products',
        through: { attributes: ['amount'] }
      }]
    });

    res.status(201).json(createdOrder);

  } catch (err) {
    res.status(500).json({ message: `Erro ao criar o pedido ${err}` });
  }
};

exports.ListByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({ // Corrigido
      where: { userId },
      include: [{
        model: product,
        as: 'products',
        through: { attributes: ['amount'] }
      }]
    });
    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: `Erro ao procurar os pedidos | err | ${err}` });
  }
};

exports.SearchById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderInstance = await Order.findOne({ // Corrigido
      where: { id: req.params.id, userId },
      include: [{
        model: product,
        as: 'products',
        through: { attributes: ['amount'] }
      }]
    });

    if (!orderInstance) return res.status(404).json({ message: `Não foi possivel encontrar o pedido` });
    res.json(orderInstance);
  } catch (err) {
    res.status(500).json({ message: `Erro ao procurar o pedido | err | ${err}` });
  }
};

exports.CancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderToCancel = await Order.findOne({ where: { id: req.params.id, userId } }); // Corrigido
    if (!orderToCancel) return res.status(404).json({ message: `Não foi possivel encontrar o pedido` });

    await OrderProduct.destroy({ where: { orderId: orderToCancel.id } });

    await orderToCancel.destroy();

    res.json({ message: `Pedido cancelado` });
  } catch (err) {
    res.status(500).json({ message: `Ocorreu um erro ao tentar cancelar o pedido | err | ${err}` });
  }
};