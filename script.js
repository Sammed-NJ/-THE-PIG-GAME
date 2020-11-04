'use strict';

// Buttons
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
// Selecter
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

    // Value holders
    let scores, currentScores, activePlayer, playing;


const init = function() {
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    player0.classList.remove  ('player--winner');
    player1.classList.remove  ('player--winner');
    player0.classList.add  ('player--active');
    player1.classList.remove  ('player--active');

    // Value holders
    scores = [0, 0];
    currentScores = 0;
    activePlayer = 0;
    playing = true;

    // Starting values
    score0.textContent = 0;
    score1.textContent = 0;
    dice.classList.add('hidden');
}
init();

// switch player fuction
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScores = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // if( activePlayer === 0) {activePlayer = 1} else {activePlayer = 0};
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

// ROLL DICE FUCTIONALITY

rollBtn.addEventListener('click', function() {
    if(playing) {
        // Generatig random dice number
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        // displau dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNumber}.png`

        // check iff the rolled dice is 1
        if(diceNumber !== 1){
            // add dice to current score
            currentScores += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScores;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', function() {
    if(playing) {
        // add the score to active player
        scores[activePlayer] += currentScores;
        // scores[activePlayer] + scores[activePlayer] + currentScores; 
        document.getElementById(`score--${activePlayer}`).textContent = 
        scores[activePlayer];

        // check if the player score is >= 100
        if(scores[activePlayer] >= 10) {
            // end the game!
            playing = false
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            // FIXME
            // document.querySelector(`.player--${activePlayer}`).classList.remove  ('player--winner');

        }else {
            // switch to the next player
            switchPlayer();
        }
    }

});


newBtn.addEventListener('click', init());