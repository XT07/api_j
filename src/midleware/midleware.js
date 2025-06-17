const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function midleware(req, res, next) {
  const authH = req.headers['authorization'];
  const token = authH && authH.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: `Token inválido ou não fornecido` });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: `Token inválido` });
    }

    req.user = { id: user.id, email: user.email };

    next();
  });
}

module.exports = midleware;