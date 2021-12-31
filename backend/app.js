const express = require("express");
const helmet = require('helmet');
const session = require('express-session');
const cors = require("cors");
const app = express();
//Install helmet
const usersRoutes = require('./routes/user');
const messagesRoutes = require('./routes/message');
const commentsRoutes = require('./routes/comment');
const likesRoutes = require('./routes/like');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(helmet());
//ajout de cette application afin de dire à l'API qu'elle est public et les actions possible à faire par le front
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania application !" });
});

/*// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});*/
 
//ajout du chemin de la route que les js devront prendre
app.use('/api/auth', usersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);
