const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const result = document.querySelector('.result');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const winner = document.querySelector('.winner');

const buttonContainer = document.querySelector('.button-container');

const buttons = [rock, paper, scissors];
let pScore = 0;
let cScore = 0;

buttons.forEach(button => button.addEventListener('click', playGame));

function computerChoice() {
	const shapes = ['rock', 'paper', 'scissors'];
  return shapes[~~Math.floor(Math.random() * shapes.length)];
}

function playerChoice() {
  return event.target.innerText;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return `It's a tie. ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} matches ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`;
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    ++pScore;
    return `You won! ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} beats ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`;
  } else {
    ++cScore;
    return `You lost! ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)} beats ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`;
  }
}

function playGame() {
		buttons.forEach(button => button.addEventListener('click', playerChoice));
    let playerSelection = playerChoice();
    if (!playerSelection) return;
    let computerSelection = computerChoice();   
    result.textContent = `Round result: ${playRound(playerSelection, computerSelection)}`;
    playerScore.textContent = `Player's score: ${pScore}`;
    computerScore.textContent = `Computer's score: ${cScore}`;
    
    if (pScore == 5 || cScore == 5) {
    checkWinner();
    resetGame();
	}
}

function checkWinner() {
  if (pScore == 5) {
    winner.textContent = "Winner: Player!";
  }
  else if (cScore == 5) {
    winner.textContent = "Winner: Computer!";
  }
}

function resetGame() {
	buttons.forEach(button => button.removeEventListener('click', playGame));
	const resetButton = document.createElement('button');
  resetButton.classList.add('reset-button');
  resetButton.textContent = "Reset game";
  buttonContainer.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
  	pScore = 0;
  	cScore = 0;
		result.textContent = "Round result:";
  	playerScore.textContent = "Player's score:";
 	 	computerScore.textContent = "Computer's score:";
    winner.textContent = "Winner:";
    buttons.forEach(button => button.addEventListener('click', playGame));
    resetButton.remove();
  });
 }