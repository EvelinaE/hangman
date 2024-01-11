// This function is triggered only when the HTML content is fully loaded
document.addEventListener("DOMContentLoaded", function () {


  const words = ["Bird", "Cake", "Book", "Tree", "Bear", "Fish", "Duck", 
  "Ball", "Lamp", "Fork", "Boot", "Milk", 
  "Hand", "Gold", "Wolf", "Chair", "Crown", "Cloud", "Horse", "Paper", 
  "Plant", "Beach", "Brush", "Apple", "Earth", "Grape", "Tiger", "Stone", 
  "Arrow", "Glass", "Mouse", "Shell", "Pearl", "Snake", "Horse", "Tiger", 
  "Water", "Spoon", "Pearl", "Sword", "Smile", "Chest", "Ghost", "Clock",
   "Voice", "Mango", "Brick", "House", "Storm", "Tiger"];

  let word = "";
  let wordDisplay = "";
  let remainingAttempts = 6;

  // Selects a new word and sets up the game board.
  function selectRandomWord() {
    word = words[Math.floor(Math.random() * words.length)];
    wordDisplay = Array.from(word).map(() => "_").join(" ");
    resetLetterTiles(); // Resets the appearance of letter tiles.
    updateDisplay();    // Updates the displayed word and remaining lives.
  }

  // Resets the appearance of all letter tiles.
  function resetLetterTiles() {
    const letterButtons = document.querySelectorAll(".letter-tile");
    letterButtons.forEach(button => {
      button.classList.remove('correct-letter', 'incorrect-letter');
    });
  }

  // Updates the displayed word and remaining attempts on the screen.
  function updateDisplay() {
    document.getElementById("word-lines").innerHTML = wordDisplay;
    document.getElementById("tries-left").textContent = remainingAttempts;
  }

  // Checks if a guessed letter is correct or not.
  function checkLetter(letter) {
    const letterElement = document.getElementById(`letter-${letter}`);

    if (word.includes(letter.toLowerCase())) {
      // If the guessed letter is correct, reveal it in the wordDisplay.
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter.toLowerCase()) {
          wordDisplay = wordDisplay.substr(0, 2 * i) + letter.toLowerCase() + wordDisplay.substr(2 * i + 1);
        }
      }

      if (!wordDisplay.includes("_")) {
        // If all letters are guessed, congratulate and start a new game.
        alert("Congratulations! You've guessed the word!");
        selectRandomWord();
        remainingAttempts = 6;
      } else {
        letterElement.classList.add('correct-letter'); // Marks the guessed letter as correct.
      }
    } else {
      // If the guessed letter is incorrect, reduces lives and checks if the game is over.
      remainingAttempts--;

      if (remainingAttempts === 0) {
        // If no attempts left, shows game over message and starts a new game.
        alert(`Ooops! Game Over! The word was ${word}`);
        selectRandomWord();
        remainingAttempts = 6;
      } else {
        letterElement.classList.add('incorrect-letter'); // Marks the guessed letter as incorrect.
      }
    }
    updateDisplay(); // The displayed word and remaining attempts are updated.
  }

  // Event listener for the letter form submission.
  document.getElementById("letter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Gets the selected letter from the form and checks it.
    const selectedLetter = document.querySelector('input[name="letter"]:checked');
    if (selectedLetter) {
      checkLetter(selectedLetter.value);
      selectedLetter.checked = false; // Unchecks the button after checking the letter
    }
  });

  // Event listeners for clicking on individual letter tiles.
  const letterButtons = document.querySelectorAll(".letter-tile");
  letterButtons.forEach(button => {
    button.addEventListener("click", function () {
      checkLetter(button.dataset.letter);
    });
  });

  // Event listener for the "New Word" button to start a new game.
  document.getElementById("newWordButton").addEventListener("click", selectRandomWord);

  // Selects a random word to start the game.
  selectRandomWord();
});
