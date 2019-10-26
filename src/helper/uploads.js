const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: path.join(__dirname + './../images/'),
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  },
});


const upload = multer({storage: storage,
  fileFilter: function(req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return console.log('Only image file');
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  }});

module.exports = upload;
