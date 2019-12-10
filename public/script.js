const socket = io("http://localhost:9000");
const socket2 = io("http://localhost:9000/admin");
socket.on("messageFromServer", msgFromServer => {
  console.log(msgFromServer);
  socket.emit("messageToServer", { data: "Data from the client" });
});

socket2.on("connect", () => {
  console.log(socket2.id);
});

socket2.on("welcome", msg => {
  console.log(msg);
});

document.getElementById("message-form").addEventListener("submit", event => {
  event.preventDefault();

  const newMessage = document.querySelector("#user-message").value;
  console.log(newMessage);
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", msg => {
  const myLi = document.createElement("li");
  myLi.textContent = msg.text;
  document.getElementById("messages").appendChild(myLi);
});
