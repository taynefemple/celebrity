const soloRoundState = {
  clues: [],
  score: 0
};

const socket = io();
socket.on('round over', () => {
  $celeb.textContent = 'This round is over!';
  $hint.textContent = ''
});

// This is not working
socket.on('remove clue', (clue) => {
  console.log(`got request to remove ${clue}`)
});

document.addEventListener('DOMContentLoaded', async function (event) {
  const clues = await fetch('/api/clues').then((res) =>
    res.json()
  );

  soloRoundState.clues = clues;

  console.log(`GOT THE STRINGIFIED CLUES: ${JSON.stringify(clues)}`);
});

const $celeb = document.querySelector('.celeb');
const $startRound = document.querySelector('#round-start');
const $hint = document.querySelector('.hint');
const $buttonListParent = document.querySelector('.button-list');

let prevClue;
let clickedOnce = false
$startRound.addEventListener('click', function (evt) {
  if (!clickedOnce) startTimer();
  if (prevClue) {
    soloRoundState.clues = soloRoundState.clues.filter((el) => el !== prevClue
    );
    // Maybe do a broadcast here instead of hitting the server
    socket.emit('remove clue', { prevClue });
    soloRoundState.score += 1;
};
  // TODO: set once; gets set on every click -
  $startRound.textContent = 'NEXT CELEBRITY!';

  if (soloRoundState.clues.length > 0) {
    const currentClue =
      soloRoundState.clues[
      Math.floor(Math.random() * soloRoundState.clues.length)
      ];

    $celeb.textContent = currentClue.celebName;
    $hint.textContent = currentClue.hint;
    clickedOnce = true;
    prevClue = currentClue;
  } else {
    $buttonListParent.append($nextRoundButton);
    $celeb.textContent = 'This round is over!';
    $hint.textContent = '';
    socket.emit('round over');
    $startRound.remove();
  }
});

const $nextRoundButton = document.createElement('button');
$nextRoundButton.id = 'round-finished';
$nextRoundButton.className = 'button';
$nextRoundButton.setAttribute('formaction', 'passingRound.html');
$nextRoundButton.textContent = 'Round Finished!';

