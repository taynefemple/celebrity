const socket = io();
console.log(socket.id); // undefined

socket.on('connect', () => {
    console.log(socket.id); // 'G5p5...'
});
