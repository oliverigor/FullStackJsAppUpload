const express = require("express"); //Usado para controlar rotas
const mongoose = require("mongoose"); //Usado para acessar o MongoDB
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors()); //Faz com que qualquer endereço acesse o app (web, mobile, ...)

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});
mongoose.connect(
  "mongodb+srv://oliverigor:oliverigor@cluster0-senbh.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true //Formato novo de conexao
  }
);
app.use((req, res, next) => {
  req.io = io;
  return next();
});

// Cadastra um módulo dentro do express
app.use(express.json()); //Ajuda o servidor a entender arquivos json
app.use(express.urlencoded({ extended: true })); //Permite que enviemos arquivos

app.use("/files", express.static(path.resolve(__dirname, "..", "temp")));

app.use(require("./routes")); //Cadastra as rotas

//Escuta a porta 3333 - testar em localhost:3333
server.listen(process.env.PORT || 3333); //Recebe requisições tanto http quanto socket
