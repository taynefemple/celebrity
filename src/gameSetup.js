// state
const state = {
    celebName: '',
    hint: '',
    playerName: '',
    team: '',
};

document.addEventListener('DOMContentLoaded', async function () {
    fetch('/api/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
})

const nameInput = document.querySelector('#player-name');
nameInput.oninput = function (evt) {
    state.playerName = evt.target.value;
    // set this in local storage
};

const teamSelect = document.querySelector('#team');
teamSelect.addEventListener('change', function (evt) {
    // set this in local storage
    state.team = evt.target.value;
    console.log(`Here is the selected team: ${evt.target.value}`)
});

const $welcome = document.querySelector('.welcome');
const $container = document.getElementById('container');

const signInButton = document.querySelector('.signin');
signInButton.addEventListener('click', async function (evt) {
    const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: state.playerName,
            teamId: state.team
        }),
    });
    const foo = await response.json();
    console.log(`Here is the response from Users create: ${foo}`);
    $welcome.remove();
    $container.append($setup);

    // submit button
    const celebSubmit = document.querySelector('.add-celeb');
    celebSubmit.addEventListener('click', async function (evt) {
        const response = await fetch('/api/clues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                celebName: state.celebName,
                hint: state.hint
            }),
        });
        const foo = await response.json();
        console.log(foo);
        celebInput.value = '';
        hintInput.value = '';
    });

    // Input fields
    const celebInput = document.querySelector('#celeb');
    celebInput.oninput = function (evt) {
        state.celebName = evt.target.value;
    };

    const hintInput = document.querySelector('#hint');
    hintInput.addEventListener('input', function (evt) {
        state.hint = evt.target.value;
    });

    // Start Game Button - REMOVE handled by html default click
    const startGame = document.querySelector('#start-game');
    startGame.addEventListener('click', function (evt) {
        console.log("Let's PLAY!!!!");
    });
})

const $setup = document.createElement('section');
$setup.innerHTML = `
    <form>
        <div class="interaction setup">
            <label class="label" for="celeb">
                Add a celebrity here:
            </label>
            <input type="text" id="celeb" />
            <label class="label" for="hint">
                Hint (optional):
            </label>
            <input type="text" id="hint" />
            <button class="add-celeb button" type="button">
                Submit
            </button>
        </div>
        <div class="interaction">
            <label class="label" for="start-game">
            I'm ready to play!
            </label>
            <button
            class="button"
            id="start-game"
            type="submit"
            formaction="./soloRound.html"
            >
                Let's go!
            </button>
        </div>
    </form>
`
