const mongoose = require("mongoose");
// Schema é Tabela
const File = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true, //cria o CreatedAt e UpdatedAt com as datas de criação e alteração
    toObject: { virtuals: true }, //Convertido em Objeto
    toJSON: { virtuals: true } //Convertido em JSON
  }
);

File.virtual("url").get(function() {
  const url = process.env.URL || `http://localhost:3333`;
  return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);
