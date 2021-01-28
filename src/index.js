// index.html
// submit button
// const celebSubmit = document.querySelector('.add-celeb');
// celebSubmit.addEventListener('click', function (evt) {
//     console.log('Celebrity Added!')
// });

// // Input field
// const celebInput = document.querySelector('#celeb');
// celebInput.addEventListener('keyup', function (evt) {
//     console.log(`Celebrity Being entered!!!!  ${evt.key}`)
// });

// // Start Game Button
// const startGame = document.querySelector('#start-game');
// startGame.addEventListener('click', function (evt) {
//     console.log('Let\'s PLAY!!!!')
// });

// rounds1and3.html
// Round Start Button
const celeb = document.querySelector('.celeb');

const startRound = document.querySelector('#round-start');
startRound.addEventListener('click', function (evt) {
    console.log('Let\'s PLAY!!!!');
    celeb.innerHTML = 'John Jacaob Jingelheimer schmidt';
});
