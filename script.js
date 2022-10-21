'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0H2 = document.querySelector('#name--0');
const player1H2 = document.querySelector('#name--1');
const btnModalRules = document.querySelector('#modalBtnRules');
const btnModalPlayers = document.querySelector('#modalBtnPlayers');

let scores, currentScore, activePlayer, playing;

// let firstPlayer = prompt('Please enter first players name');
// let secondPlayer = prompt('Please enter second players name');
// // TODO: modal do podania nazw graczy ALE, niech sie wyswietli po zamknieciu zasad, 2 pola, po zatwierdzeniu, sprawdzic nulle
// if (firstPlayer != null && secondPlayer != null) {
//   player0H2.textContent = firstPlayer;
//   player1H2.textContent = secondPlayer;
// }

// Starting conditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if rolled 1: if true
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to actve player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      // If yes finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // If not switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
function closeDialog() {
  const dialog = document.querySelector('#dialog');
  dialog.remove();
  btnModalRules.removeEventListener('click', closeDialog);
}
btnModalRules.addEventListener('click', function () {
  document.getElementById('dialogRules').style.display = 'none';
  document.getElementById('dialogPlayers').style.display = 'flex';
});

btnModalPlayers.addEventListener('click', function () {
  let player1 = document.querySelector('#player1Name').value;
  let player2 = document.querySelector('#player2Name').value;

  if (player1 != null && player2 != null) {
    player0H2.textContent = player1;
    player1H2.textContent = player2;
  }

  closeDialog();
});
