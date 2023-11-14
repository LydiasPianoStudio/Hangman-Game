// Define the list of words to choose from
const words = [
  'DWIGHT',
  'MICHAEL',
  'JIM',
  'PAM',
  'ANGELA',
  'STANLEY',
  'DUNDERMIFFLIN',
  'SCRANTON',
  'PRANK',
  'PAPER',
  'BEARS',
  'SALES',
  'THATSWHATSHESAID',
  'SCHRUTE',
  'HALPERT',
  'BEETS',
  'CREED',
  'TOBY'
];



// Define the maximum number of incorrect guesses allowed
const maxWrongGuesses = 6;

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;

// Select random word from the list
function selectRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Initialize the game
function initializeGame() {
  // Reset game variables
  wordToGuess = selectRandomWord();
  guessedLetters = Array(wordToGuess.length).fill('_');
  wrongGuesses = 0;
  imageCount = 1;

  // Update the game elements
  updateWordDisplay();
  updateHangmanGameGraphic();
  generateLetterButtons();
  clearMessage();
}

// Add this function to your HangmanGame.js file
function resetGame() {
  // Reset variables and game state
  wordToGuess = '';
  guessedLetters = [];
  wrongGuesses = 0;
  imageCount = 1;

  // Call the function to initialize the game (you may need to adjust this function name)
  initializeGame();
}

// You can call this function when the page loads to initialize the game
window.addEventListener('load', initializeGame);


// Update the word display
function updateWordDisplay() {
  const wordContainer = document.querySelector('.word');
  wordContainer.innerText = guessedLetters.join(' ');
}


// Handle a letter guess
function handleGuess(letter) {
  // If the letter has already been guessed, do nothing
  if (guessedLetters.includes(letter)) {
    return;
  }

  // Add the letter to the list of guessed letters
  guessedLetters.forEach((guessedLetter, index) => {
    if (wordToGuess[index] === letter) {
      guessedLetters[index] = letter;
    }
  });

  // If the letter is not in the hidden word, increment the wrong guesses count and update the Hangman graphic
  if (!wordToGuess.includes(letter)) {
    wrongGuesses++;
    updateHangmanGameGraphic();
  }

  // Update the word display
  updateWordDisplay();

  // Disable the clicked button and add CSS for styling
  disableAndStyleLetterButton(letter);

  // Check if the game has been won or lost
  checkWinOrLose();
}

// Function to disable the letter button and add styling
function disableAndStyleLetterButton(letter) {
  const button = document.querySelector(`.letterButton[value=${letter}]`);
  if (button && !button.disabled) {
    button.disabled = true;
    button.classList.add('disabled', 'active');
  }
}

// Update the Hangman graphic
function updateHangmanGameGraphic() {
  if (imageCount <= maxWrongGuesses) {
    const hangmanGameContainer = document.querySelector('.HangmanGame');
    const hangmanImage = document.createElement('img');
    hangmanImage.src = `./pictures/hangmanGame${imageCount}.jpg`;
    hangmanImage.alt = `Hangman ${imageCount}`;
    hangmanImage.style.maxWidth = '100%'; // Set the maximum width
    hangmanImage.style.maxHeight = '100%'; // Set the maximum height
    hangmanGameContainer.innerHTML = ''; // Clear the container
    hangmanGameContainer.appendChild(hangmanImage); // Append the new image
    imageCount++;
  } else if (imageCount === maxWrongGuesses + 1) {
    const hangmanGameContainer = document.querySelector('.HangmanGame');
    const hangmanImage = document.createElement('img');
    hangmanImage.src = './pictures/gameOver.png'; // Display "gameOver.png" for the 7th guess
    hangmanImage.alt = 'Game Over';
    hangmanImage.style.maxWidth = '100%';
    hangmanImage.style.maxHeight = '100%';
    hangmanGameContainer.innerHTML = '';
    hangmanGameContainer.appendChild(hangmanImage);
  }
}

function displayWinGif() {
  const hangmanGameContainer = document.querySelector('.HangmanGame');
  hangmanGameContainer.innerHTML = `
    <div class="win-gif-container" style="max-width: 100%; max-height: 100%; margin: 0 auto; padding: 20px; background: rgba(0, 0, 0, 0.5); border-radius: 10px; overflow: hidden;">
      <img src="https://media.giphy.com/media/tlGD7PDy1w8fK/giphy.gif" 
           alt="Winning GIF" 
           style="width: 100%; height: auto;">
    </div>
    <p><a href="https://giphy.com/gifs/happy-the-office-surprised-tlGD7PDy1w8fK" target="_blank">via GIPHY</a></p>
  `;
}

// Generate letter buttons
function generateLetterButtons() {
  const lettersContainer = document.querySelector('.letters');
  while (lettersContainer.firstChild) {
    lettersContainer.removeChild(lettersContainer.firstChild);
  }

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const button = document.createElement('button');
    button.innerText = letter;
    button.addEventListener('click', () => handleGuess(letter));
    lettersContainer.appendChild(button);
  }
}

// Clear the win/lose message
function clearMessage() {
  const messageContainer = document.querySelector('.message');
  messageContainer.innerText = '';
}

// Check if the game has been won or lost
function checkWinOrLose() {
  if (guessedLetters.join('') === wordToGuess) {
    displayWinMessage();
    disableLetterButtons();
  } else if (wrongGuesses >= maxWrongGuesses) {
    displayLoseMessage();
    disableLetterButtons();
  }
}

// Display a win message and the GIF
function displayWinMessage() {
  const messageContainer = document.querySelector('.message');
  messageContainer.innerHTML = `
    <p>You win!</p>
    <button id="replayButton" class="replay-button">Replay</button>
  `;
  document.getElementById('replayButton').addEventListener('click', resetGame);
  displayWinGif();
}

// Display a lose message and "gameOver.png" image
function displayLoseMessage() {
  const messageContainer = document.querySelector('.message');
  messageContainer.innerHTML = `
    <p>You lose! The word was "${wordToGuess}".</p>
    <button id="replayButton" class="replay-button">Replay</button>
  `;
  document.getElementById('replayButton').addEventListener('click', resetGame);

  // Change the image source to "gameOver.png"
  const hangmanImage = document.getElementById('hangmanImage');
  hangmanImage.src = 'pictures/gameOver.png';
}

// Initialize the game when the page loads
window.addEventListener('load', initializeGame);