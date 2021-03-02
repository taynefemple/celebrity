const soloRoundState = {
    teamId: 0,
    playerName: '',
    turn: false,
    clues: [],
    score: 0,
};

// setup sockets
const socket = io();
socket.on('round over', () => {
    $celeb.textContent = 'This round is over!';
    $hint.textContent = '';
});

// This is not working?
socket.on('remove clue', (clue) => {
    console.log(`got request to remove ${clue}`);
});

// TODO add another socket listener to listen for turn change - remove overlay when true

// get player info from storage
soloRoundState.teamId = window.sessionStorage.getItem('team');
soloRoundState.playerName = window.sessionStorage.getItem('player');

// fetch players turn
const turnResponse = await fetch(`/api/users/${soloRoundState.playerName}`);
const turnResponseJson = await turnResponse.json();
soloRoundState.turn = turnResponseJson.turn;

document.addEventListener('DOMContentLoaded', async function (event) {
    //  don't chain off await!!!
    const clues = await fetch('/api/clues').then((res) => res.json());

    soloRoundState.clues = clues;

    console.log(`GOT THE STRINGIFIED CLUES!: ${JSON.stringify(clues)}`);
});

// create overlay when it isn't player's turn
const $overlay = document.createElement('div');
$overlay.className = 'blackoutoverl';
if (soloRoundState.turn) document.body.append($overlay);

const $celeb = document.querySelector('.celeb');
const $startRound = document.querySelector('#round-start');
const $hint = document.querySelector('.hint');
const $buttonListParent = document.querySelector('.button-list');

// display next round button when out of celebs
const $nextRoundButton = document.createElement('button');
$nextRoundButton.id = 'round-finished';
$nextRoundButton.className = 'button';
$nextRoundButton.setAttribute('formaction', 'passingRound.html');
$nextRoundButton.textContent = 'Round Finished!';

// the game logic
let prevClue;
let clickedOnce = false;
$startRound.addEventListener('click', async function (evt) {
    // only start the timer on the first click
    if (!clickedOnce) startTimer();
    if (prevClue) {
        soloRoundState.clues = soloRoundState.clues.filter(
            (el) => el !== prevClue
        );
        console.log(`PREVIOUS CLUE ID: ${JSON.stringify(prevClue)}`);
        // Maybe do a broadcast here instead of hitting the server
        socket.emit('remove clue', { prevClue });
        soloRoundState.score += 1;
        const idForFetch = prevClue.id;
        // mark clue as inactive
        await fetch('/api/clues', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: prevClue.id }),
        });
    }
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
