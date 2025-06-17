const product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');

exports.ListAll = async (_req, res) => {
  const products = await product.findAll();
  res.json(products);
};

exports.SearchById = async (req, res) => {
  const Product = await product.findByPk(req.params.id);
  if (!Product) return res.status(404).json({ message: `Não foi possivel achar o produto` });
  res.json(Product); // Corrigido de 'produto' para 'Product'
};

exports.Create = async (req, res) => {
  const { name, price, categoriId } = req.body;
  const Product = await product.create({ name, price, categoriId });
  res.status(201).json(Product);
};

exports.Update = async (req, res) => {
  const { name, price, categoriId } = req.body;
  const Product = await product.findByPk(req.params.id);
  if (!Product) return res.status(404).json({ message: `Não foi possivel achar o produto` });
  Product.name = name || Product.name;
  Product.price = price || Product.price;
  Product.categoriId = categoriId || Product.categoriId;

  await Product.save();
  res.json(Product);
};

exports.Delet = async (req, res) => {
  const Product = await product.findByPk(req.params.id);
  if (!Product) return res.status(404).json({ message: `Não foi possivel achar o produto` });

  const counter = await OrderProduct.count({ where: { productId: Product.id } }); // Corrigido de 'product.id' para 'Product.id'
  if (counter > 0) {
    return res.status(409).json({ message: `Não é possivel deletar o produto pois tem pedidos ativos` });
  }

  await Product.destroy();
  res.json({ message: `Produto deletado` });
};