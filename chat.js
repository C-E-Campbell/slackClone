const express = require("express");
const socketio = require("socket.io");
const app = express();

app.use(express.static(__dirname + "/public"));

const expressSever = app.listen(9000, () => {
  console.log("App listening on port 9000!");
});

const io = socketio(expressSever);
io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "Welcome to the socket.io server" });
  socket.on("messageToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", msg => {
    io.emit("messageToClients", { text: msg.text });
  });
});

io.of("/admin").on("connection", () => {
  console.log("connected to admin");
  io.of("/admin").emit("welcome", "Welcome to admin");
});
