const mongoose = require("mongoose");

// Schema é Tabela
const Box = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
  },
  {
    timestamps: true //cria o CreatedAt e UpdatedAt com as datas de criação e alteração
  }
);

module.exports = mongoose.model("Box", Box);
