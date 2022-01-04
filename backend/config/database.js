const config = require('../config');

module.exports = {
  HOST: `${config.HOST}`,
  USER: `${config.USER}`,
  PASSWORD: `${config.PASSWORD}`,
  DB: `${config.DB}`,
  dialect: 'mysql',
};
