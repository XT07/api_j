const order = require('../models/Order');
const product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');

exports.CreateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itens } = req.body;

    const order = await order.create({ userId });

    const orderProdut = itens.map(i => ({
      orserId: order.id,
      productId: i.productId,
      amount: i.amount || 1,
    }));
    await OrderProduct.bulkCreate(orderProdut);

    const NewOrder = await order.findByPk(Order.id, {
      include: [{
        model: product,
        as: 'products',
        through: { attributes: ['amount'] }
      }]
    });

    res.status(201).json(NewOrder);

  } catch (err) {
    res.status(500).json({ message: `Erro ao criar o pedido ${err}` });
  }
};

exports.ListByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await order.findAll({
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
    const Order = await order.findOne({
      where: { id: req.params.id, userId },
      include: [{
        model: product,
        as: 'products',
        through: { attributes: ['amount'] }
      }]
    });

    if (!Order) return res.status(404).json({ message: `Não foi possivel encontrar o pedido` });
    res.json(Order);
  } catch (err) {
    res.status(500).json({ message: `Erro ao procurar o pedido | err | ${err}` });
  }
};

exports.CancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const Order = await order.findOne({ where: { id: req.params.id, userId } });
    if (!Order) return res.status(404).json({ message: `Não foi possivel encontrar o pedido` });

    await OrderProduct.destroy({ where: { orderId: Order.id } });

    await Order.destroy();

    res.json({ message: `Pedido cancelado` });
  } catch (err) {
    res.status(500).json({ message: `Ocorreu um erro ao tentar cancelar o pedido | err | ${err}` });
  }
};