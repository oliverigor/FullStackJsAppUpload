const express = require("express");
const multer = require("multer"); //middleware para upload de arquivos
const multerConfig = require("./config/multer");

const routes = express.Router();
const BoxController = require("./controller/BoxController");
const FileController = require("./controller/FileController");

// .get => Buscar informação
// .post => Criar alguma coisa
// .put => Editar
// .delete => Deletar

//Cria Rota e Middleware para interceptar e dar uma resposta
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"),
  FileController.store
);

module.exports = routes; //exporta a variavel routes
