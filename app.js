/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameIsPlaying;



inIt();

//console.log(dice);
// document.querySelector('#current-'+activePlayer).textContent = dice;
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){

    // Check is the game is still playing

    if(gameIsPlaying){

// 1. Generate Random number
var dice = Math.floor(Math.random() * 6) + 1;

// 2. Display results
var diceDOM = document.querySelector('.dice');  // For the sake of conveniency 
diceDOM.style.display = 'block';                // Re-displaying the dice
diceDOM.src = 'dice-' + dice + '.png';          // Changing the image as per the rolled dice

// 3. Update the round score IF rolled dice is not 1
// roundScore = parseInt(document.getElementById('score-'+activePlayer).textContent);
    if(dice !== 1){
    // Add to score  
        roundScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }else{
    // Next player
        nextPlayer();
    }
 }
});    

document.querySelector('.btn-hold').addEventListener('click', function(){

    // Check if game is still active

    if(gameIsPlaying){
        // Add current score to global score
        scores[activePlayer] += roundScore;

    // Update UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    // Check if the player has won the game

        if(scores[activePlayer] >= 10){
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gameIsPlaying = false;
        }else{  
        // Next Player
        nextPlayer();
        }
    }   
});

document.querySelector('.btn-new').addEventListener('click',inIt);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
}

function inIt(){
    gameIsPlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';


}

