const socket = new WebSocket('ws://localhost:3000/');
socket.onopen = function (event) {
  socket.send('Hello server!');
};

socket.onmessage = function (event) {
  document.body.innerText = event.data;
};
