const soloRoundState = {
    clues: [],
};

const socket = io('http://localhost:8080');
socket.on('round over', () => (celeb.innerHTML = 'This round is over!'));

document.addEventListener('DOMContentLoaded', async function (event) {
    const clues = await fetch('http://localhost:8080/api/clues').then((res) =>
        res.json()
    );

    soloRoundState.clues = clues;

    console.log('DOM fully loaded and parsed');
    console.log(`GOT THE STRINGIFIED CLUES: ${JSON.stringify(clues)}`);
});

const celeb = document.querySelector('.celeb');
const startRound = document.querySelector('#round-start');
const nextCeleb = document.querySelector('#next-celeb');
const hint = document.querySelector('.hint');

startRound.addEventListener('click', function (evt) {
    console.log("Let's PLAY!!!!");
    console.log('1', soloRoundState.clues.length);
    // fire this one time then handoff to next celeb
    const currentClue =
        soloRoundState.clues[
            Math.floor(Math.random() * soloRoundState.clues.length)
        ];

    console.log(`LOOK AT THS Stuff:${currentClue}`);
    console.log(`LOOK AT THS NAME Stuff:${currentClue.name}`);

    celeb.innerHTML = currentClue.name;
    hint.innerHTML = currentClue.hint;

    soloRoundState.clues = soloRoundState.clues.filter(
        (el) => el !== currentClue
    );
    console.log('2', soloRoundState.clues.length);
});

const $nextRoundButton = document.createElement('button');
$nextRoundButton.id = 'round-finished';
$nextRoundButton.className = 'button';
$nextRoundButton.setAttribute('formaction', 'passingRound.html');
$nextRoundButton.innerHTML = 'Round Finished!';

const buttonListParent = document.querySelector('.button-list');

nextCeleb.addEventListener('click', () => {
    if (soloRoundState.clues.length > 0) {
        console.log('1', soloRoundState.clues.length);

        const currentClue =
            soloRoundState.clues[
                Math.floor(Math.random() * soloRoundState.clues.length)
            ];

        celeb.innerHTML = currentClue.name;
        hint.innerHTML = currentClue.hint;

        soloRoundState.clues = soloRoundState.clues.filter(
            (el) => el !== currentClue
        );

        console.log('2', soloRoundState.clues.length);
        console.log('2', soloRoundState.clues.length);
    } else {
        buttonListParent.append($nextRoundButton);
        celeb.innerHTML = 'This round is over!';
        hint.innerHTML = '';
        socket.emit('end round');
    }
});

function formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
}
