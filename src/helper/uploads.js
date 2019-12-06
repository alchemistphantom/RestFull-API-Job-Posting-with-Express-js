const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname + "./../images/"),
  filename: function(req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    const ext = path.extname(file.originalname);
    let Filesize = file.size;
    console.log("ukuran " + file.size);
    let up = false;
    if (!file) {
      console.log("please select an image to upload");
    } else if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg"
    ) {
      console.log("Only image file");
    } else up = true;
    callback(null, up);
  },
  limits: {
    fileSize: 1024 * 1024
  }
});

module.exports = upload;
