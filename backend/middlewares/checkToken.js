var jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {

  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = bearerToken.split(' ')[1];

    const SECRET_KEY =
      'fsdefe87re89ru39825r942780efheb676thtdetsefubvisihf0w8his';
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }

  return res.status(403).json({ message: 'Admin access only' });
};

module.exports = { checkToken, adminOnly };