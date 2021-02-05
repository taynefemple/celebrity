// state
const state = {
    name: '',
    hint: '',
};

// submit button
const celebSubmit = document.querySelector('.add-celeb');
celebSubmit.addEventListener('click', async function (evt) {
    const response = await fetch('http://localhost:8080/api/clues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:8081',
        },
        mode: 'cors',
        body: JSON.stringify(state),
    });
    const foo = response.json();
    console.log(foo);
    celebInput.value = '';
    hintInput.value = '';
});

// Input fields
const celebInput = document.querySelector('#celeb');
celebInput.oninput = function (evt) {
    state.name = evt.target.value;
};

const hintInput = document.querySelector('#hint');
hintInput.addEventListener('input', function (evt) {
    state.hint = evt.target.value;
});

// Start Game Button
const startGame = document.querySelector('#start-game');
startGame.addEventListener('click', function (evt) {
    console.log("Let's PLAY!!!!");
});
