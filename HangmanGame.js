// Define the list of words to choose from
const words = [
  'JAVASCRIPT',
  'HTML',
  'CSS',
  'NODE',
  'REACT',
  'ANGULAR',
  'JQUERY',
  'VUE'
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

  // Check if the game has been won or lost
  checkWinOrLose();
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

// Display a win message
function displayWinMessage() {
  const messageContainer = document.querySelector('.message');
  messageContainer.innerText = 'You win!';
}

// Display a lose message and "gameOver.png" image
function displayLoseMessage() {
  const messageContainer = document.querySelector('.message');
  messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
  
  // Change the image source to "gameOver.png"
  const hangmanImage = document.getElementById('hangmanImage');
  hangmanImage.src = 'pictures/gameOver.png';
}

// Disable letter buttons after the game ends
function disableLetterButtons() {
  const letterButtons = document.querySelectorAll('.letters button');
  letterButtons.forEach(button => {
    button.disabled = true;
  });
}

// Initialize the game when the page loads
window.addEventListener('load', initializeGame);

