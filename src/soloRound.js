// const socket = io('http://localhost:8080');

// console.log(socket.id);

// socket.on('connect', () => {
//   console.log(socket.id);
// });

const soloRoundState = {
  clues: []
}

document.addEventListener('DOMContentLoaded', async function (event) {
    const clues = await fetch('http://localhost:8080/api/clues')
      .then((res) => res.json());

    soloRoundState.clues = clues;

    console.log('DOM fully loaded and parsed');
    console.log(`GOT THE STRINGIFIED CLUES: ${JSON.stringify(clues)}`)
});

const celeb = document.querySelector('.celeb');
const startRound = document.querySelector('#round-start');

startRound.addEventListener('click', function (evt) {
    console.log("Let's PLAY!!!!");
    celeb.innerHTML = soloRoundState.clues[Math.floor(Math.random() * soloRoundState.clues.length)].name;
});
