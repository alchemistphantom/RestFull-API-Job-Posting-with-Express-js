const fs = require("fs");

const deleteFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.unlinkSync(filePath, function(error) {});
    resolve("successfully deleted file");
    reject("failed to delete file");
  });
};

module.exports = deleteFile;
