const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //On créer une constante afin de décodé le token et son contenu
    const decodedToken = jwt.verify(token, `${config.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      res.locals.user = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Unauthorized request!'),
    });
  }
};
