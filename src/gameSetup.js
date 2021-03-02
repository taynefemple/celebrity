// state
const state = {
    celebName: '',
    hint: '',
};

// Input fields
const celebInput = document.querySelector('#celeb');
celebInput.addEventListener('input', function (evt) {
    console.log(evt.target.value);
    state.celebName = evt.target.value;
});

const hintInput = document.querySelector('#hint');
hintInput.addEventListener('input', function (evt) {
    state.hint = evt.target.value;
});

// submit button
const celebSubmit = document.querySelector('.add-celeb');
celebSubmit.addEventListener('click', async function (evt) {
    const response = await fetch('/api/clues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            celebName: state.celebName,
            hint: state.hint,
        }),
    });
    const foo = await response.json();
    console.log(foo);
    celebInput.value = '';
    hintInput.value = '';
});

// Start Game Button - REMOVE handled by html default click
const startGame = document.querySelector('#start-game');
startGame.addEventListener('click', function (evt) {
    console.log("Let's PLAY!!!!");
});
