// Importation de multer
const multer = require('multer');
const helpers = require('../helpers');

// --------------------- MIDDLEWARES ---------------------- //

// Déclaration d'une constante pour générer une extension de fichier (jpg ou png)
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, 'images');
  },

  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('imageUrl');
