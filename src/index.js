// state
const state = {
    playerName: '',
    team: '',
};

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
}); 
