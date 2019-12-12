const express = require("express");
const socketio = require("socket.io");
const app = express();
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => {
  console.log("App listening on port 9000!");
});
const io = socketio(expressServer);

let namespaces = require("./data/namespaces");

namespaces.forEach(namespace => {
  io.of(namespaces.endpoint).on("connection", socket => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});

io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "Welcome to the socket.io server" });
  socket.on("messageToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.join("level1");
  socket.to("level1").emit("joined", `${socket.id} says I have joined lvl 1`);
});

io.of("/admin").on("connection", () => {
  console.log("connected to admin");
  io.of("/admin").emit("welcome", "Welcome to admin");
});
