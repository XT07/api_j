const categori = require('../models/Categori');
const product = require('../models/Product');

exports.ListAll = async (_req, res) => {
  const categories = await categori.findAll();
  res.json(categories);
};

exports.SearchById = async (req, res) => {
  const Categori = await categori.findByPk(req.params.id);
  if (!Categori) return res.status(404).json({ message: `Categoria não encontrada` });
  res.json(Categori);
};

exports.Create = async (req, res) => {
  const { name } = req.body;
  const Categori = await categori.create({ name });
  res.status(201).json(Categori);
};

exports.Update = async (req, res) => {
  const { name } = req.body;
  const Categori = await categori.findByPk(req.params.id);
  if (!Categori) return res.status(404).json({ message: `categoria não encontrada` });

  Categori.name = name || Categori.nome;
  await Categori.save();

  res.json(Categori);
};

exports.Delet = async (req, res) => {
  const categori = await categoria.findByPk(req.params.id);
  if (!categori) return res.status(404).json({ message: `Categoria não encontrada` });

  const counter = await product.count({ where: { categoriId: categori.id } });
  if (counter > 0) {
    return res.status(409).json({ message: `Não pode ser deletado pois tem vinculos com outros produtos` });
  }

  await categori.destroy();
  res.json({ message: `Categoria deletada :)` });
};