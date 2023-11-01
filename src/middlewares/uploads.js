const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'src/public/uploads/post-images');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;