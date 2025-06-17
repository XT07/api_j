const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/User');

exports.Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await user.findOne({ where: { email } })) {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const User = await user.create({ name: name, email, password: hash });
    const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ id: User.id, name: User.name, email: User.email, token });
  } catch (err) {
    res.status(500).json({ message: `Erro ocorrido no servidor | err | ${err}` });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ where: { email } });

    if (!User || !(await bcrypt.compare(password, User.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const payload = { id: User.id, email: User.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: `Erro ocorrido no servidor | err | ${err}` });
  }
};

exports.Profile = async (req, res) => {
  try {
    const User = await user.findByPk(req.user.id, { attributes: ['id', 'name', 'email'] });
    if (!User) return res.status(404).json({ message: `Usuário não encontrado` });

    res.json(User);
  } catch (err) {
    res.status(500).json({ message: `Erro ocorrido no servidor | err | ${err}` });
  }
};

exports.UpdateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const User = await user.findByPk(req.user.id);
    if (!User) return res.status(404).json({ message: `Usuário não encontrado` });

    User.name = name || User.name;
    User.email = email || User.email;
    await User.save();

    res.json({ id: User.id, name: User.name, email: User.email });
  } catch (err) {
    res.status(500).json({ message: `Erro ocorrido no servidor | err | ${err}` });
  }
};

exports.UpdatePass = async (req, res) => {
  try {
    const { OldPass, NewPass } = req.body;
    const User = await user.findByPk(req.user.id);
    if (!User) return res.status(404).json({ message: `Usuário não encontrado` });

    if (!(await bcrypt.compare(OldPass, User.password))) {
      return res.status(401).json({ message: `Senha incorreta` });
    }

    const salt = await bcrypt.genSalt(10);
    User.password = await bcrypt.hash(NewPass, salt);
    await User.save();

    res.json({ message: `Senha atualizada` });
  } catch (err) {
    res.status(500).json({ message: `Erro ocorrido no servidor | err | ${err}` });
  }
};

exports.DeletAcount = async (req, res) => {
  try {
    const User = await user.findByPk(req.user.id);
    if (!User) return res.status(404).json({ message: `Usuário não encontrado` });
    await User.destroy();

    res.json({ message: `Conta deletada` });
  } catch (err) {
    res.status(500).json({ message: `Erro ocorrido no servidor` });
  }
};