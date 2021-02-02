const socket = io('http://localhost:8080');
console.log(socket.id); // undefined

socket.on('connect', () => {
  console.log(socket.id); // 'G5p5...'
});
