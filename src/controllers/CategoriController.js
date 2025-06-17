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

  Categori.name = name || Categori.name; // Corrigido de 'Categori.nome' para 'Categori.name'
  await Categori.save();

  res.json(Categori);
};

exports.Delet = async (req, res) => {
  const categoryToDelete = await categori.findByPk(req.params.id); // Corrigido 'categoria' e nome da variável
  if (!categoryToDelete) return res.status(404).json({ message: `Categoria não encontrada` });

  const counter = await product.count({ where: { categoriId: categoryToDelete.id } }); // Usando a variável correta
  if (counter > 0) {
    return res.status(409).json({ message: `Não pode ser deletado pois tem vinculos com outros produtos` });
  }

  await categoryToDelete.destroy(); // Usando a variável correta
  res.json({ message: `Categoria deletada :)` });
};