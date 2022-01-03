const express = require('express');
const db = require('./models');
const path = require('path');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Groupomania application.' });
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/', userRoutes);

db.sequelize.sync();

module.exports = app;









