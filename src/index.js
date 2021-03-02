// state
const state = {
    playerName: '',
    team: '',
};

// HACK - team creation needs to be elsewhere
// document.addEventListener('DOMContentLoaded', async function () {
//     fetch('/api/teams', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
// });

const nameInput = document.querySelector('#player-name');
nameInput.addEventListener('input', function (evt) {
    state.playerName = evt.target.value;
    // set this in local storage
});

const teamSelect = document.querySelector('#team');
teamSelect.addEventListener('change', function (evt) {
    // set this in local storage
    state.team = evt.target.value;
    console.log(`Here is the selected team: ${evt.target.value}`);
});

const signInButton = document.querySelector('#signin-submit');
signInButton.addEventListener('click', async function (evt) {
    window.sessionStorage.setItem('player', `${state.playerName}`);
    window.sessionStorage.setItem('team', `${state.team}`);
    const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: state.playerName,
            teamId: +state.team,
        }),
    });

    const foo = JSON.stringify(response);
    console.log(`Here is the response from Users create: ${foo}`);
});
