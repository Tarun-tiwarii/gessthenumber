// --- Game Variables ---
let secretNumber;
let guessesRemaining = 10;
const MAX_GUESSES = 10;

// --- DOM Elements ---
const guessInput = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const resetBtn = document.getElementById('reset-btn');
const feedbackMessage = document.getElementById('feedback-message');
const guessesLeftSpan = document.getElementById('guesses-left');

// --- Functions ---

/**
 * Initializes a new game by setting the secret number and resetting the UI.
 */
function initGame() {
    // Generate a new random number between 1 and 100 (inclusive)
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessesRemaining = MAX_GUESSES;

    // Reset the UI elements
    guessesLeftSpan.textContent = guessesRemaining;
    feedbackMessage.textContent = 'Start guessing!';
    feedbackMessage.style.color = '#333';
    guessInput.value = '';

    // Enable/Disable buttons
    checkBtn.disabled = false;
    guessInput.disabled = false;
    resetBtn.classList.add('hidden');
    console.log('New Secret Number:', secretNumber); // For testing/debugging
}

/**
 * Handles the user's guess submission.
 */
function checkGuess() {
    // Get the user's guess and convert it to a number
    const guess = parseInt(guessInput.value);

    // Basic Input Validation
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedbackMessage.textContent = 'Please enter a valid number between 1 and 100.';
        feedbackMessage.style.color = 'orange';
        return; // Stop execution if validation fails
    }

    // Decrement guesses
    guessesRemaining--;
    guessesLeftSpan.textContent = guessesRemaining;

    // Game Logic
    if (guess === secretNumber) {
        // WIN condition
        feedbackMessage.textContent = `🎉 Congratulations! You guessed the number ${secretNumber}!`;
        feedbackMessage.style.color = 'green';
        endGame(true);
    } else if (guessesRemaining === 0) {
        // LOSE condition
        feedbackMessage.textContent = `😭 Game Over! The number was ${secretNumber}.`;
        feedbackMessage.style.color = 'red';
        endGame(false);
    } else {
        // Hint condition
        if (guess < secretNumber) {
            feedbackMessage.textContent = 'Too Low! Try a higher number.';
            feedbackMessage.style.color = 'blue';
        } else {
            feedbackMessage.textContent = 'Too High! Try a lower number.';
            feedbackMessage.style.color = 'darkorchid';
        }
    }
}

/**
 * Ends the current game session, disabling the input and showing the reset button.
 * @param {boolean} didWin - True if the player won, false otherwise.
 */
function endGame(didWin) {
    checkBtn.disabled = true;
    guessInput.disabled = true;
    resetBtn.classList.remove('hidden');
}

// --- Event Listeners ---
checkBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', initGame);

// Allow the user to press Enter to submit their guess
guessInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Start the game when the script loads
initGame();