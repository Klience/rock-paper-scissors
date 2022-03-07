/*
This is a v.1 console.log()-edition Rock-Paper-Scissors game.
All results are meant to be displayed in console.

=====The rules:=====

Play 5 games in total.
For each game:
	- Player picks a shape.
  - Computer randomly picks a shape.
  - Game compares choices using predefined rules.
  - Game outputs a win/loss/tie statement.
  - Game increments player's or computer's score by 1 and outputs the score.
  - Game outputs the rule applied.
  - Game outputs the round's number, e.g. Round #1.
  - Game outputs the final winner when player or computer reaches the score of 5.

  */

let playerScore = 0;
let computerScore = 0;

const shapes = ['rock', 'paper', 'scissors'];

// Returns computer's random choice value
function computerChoice() {
  return shapes[~~Math.floor(Math.random() * shapes.length)];
}
// Returns player's choice value
function playerChoice() {
  return prompt('Pick a shape', '');
}

// Defines rules, compares choices, defines winner and score
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase(); // cannot read undefined sometimes
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return `It's a tie. ${playerSelection} matches ${computerSelection}`; // maybe bug here
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    ++playerScore; // bug here
    return `You won! ${playerSelection} beats ${computerSelection}`;
  } else {
    ++computerScore; // bug here
    return `You lost! ${computerSelection} beats ${playerSelection}`;
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    // check this
    let computerSelection = computerChoice();
    let playerSelection = playerChoice();
    let roundResult = ``;
    if (playerSelection === null || playerSelection === '') {
      return;
    } else {
      roundResult = playRound(playerSelection, computerSelection); // bug here
    }
    console.log(`Player's score: ${playerScore}`);
    console.log(`Computer's score: ${computerScore}`);
    console.log(
      `Round #${i}: ${playRound(playerSelection, computerSelection)}`
    );
  }
}

function endGame() {
  if (playerScore > computerScore) {
    console.log(`Player wins with a score of ${playerScore}`);
  } else if (playerScore < computerScore) {
    console.log(`Computer wins with a score of ${computerScore}`);
  } else if (playerScore == computerScore) {
    // bug here
    console.log('Friendship wins!');
  } else {
    console.log('Game canceled');
  }
}
// game
game();
endGame();

/*
Found bugs:
-- Friendship wins when player's choice has empty string "" or undefined;
  -- that's because player's undefined value is the same as computer's undefined value, because 
-- game() doesn't show returned values from playRound();
-- when there's a tie, player's or computer's score randomly increases by 1;
-- score increases inconcsistently;
-- roundResult is declared but it's value is never read;

*/
