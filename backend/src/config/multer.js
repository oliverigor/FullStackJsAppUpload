const multer = require("multer");
const path = require("path"); //Resolve caminhos independente da plataforma
const crypto = require("crypto"); //Gera hash únicos
//Multer só processa formulários multipart ( multipart/form-data).
module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp"),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  })
};
