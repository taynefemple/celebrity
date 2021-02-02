const socket = io('http://localhost:8080');

console.log(socket.id);

socket.on('connect', () => {
  console.log(socket.id);
});

const celeb = document.querySelector('.celeb');
const startRound = document.querySelector('#round-start');

startRound.addEventListener('click', function (evt) {
    console.log('Let\'s PLAY!!!!');
    celeb.innerHTML = 'John Jacaob Jingelheimer schmidt';
});
