const socket = io("http://localhost:9000");
const socket2 = io("http://localhost:9000/wiki");
const socket3 = io("http://localhost:9000/mozilla");
const socket4 = io("http://localhost:9000/linux");

socket.on("messageFromServer", msgFromServer => {
  console.log(msgFromServer);
  socket.emit("messageToServer", { data: "Data from the client" });
});

socket.on("joined", msg => console.log(msg));

socket2.on("welcome", msg => {
  console.log(msg);
});

document.getElementById("message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  console.log(newMessage);
  socket.emit("newMessageToServer", { text: newMessage });
});
