import { words } from "./words.js";
// console.log(words);
// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container

let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  //   Create Span
  let span = document.createElement("span");
  //   Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  //   Append The Letter To Span
  span.appendChild(theLetter);
  //   Add Class On Span
  span.className = "letter-box";
  //   Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

//Random Property
let allKeys = Object.keys(words);
// Get Random Number using allkeys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category name
let randomPropName = allKeys[randomPropNumber];
// Category Words
let randomPropValue = words[randomPropName];
// Random Number Depend on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
//Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select Letters Guess Element
let lettersGuessContainer = document.querySelector(".container .letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word

lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }
  // Append Span To lettersGuessContainer
  lettersGuessContainer.appendChild(emptySpan);
});
// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking on letters
document.addEventListener("click", (e) => {
  // Set Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get  Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // the Chosen Word
    lettersAndSpace.forEach((wordLetter, wordIndex) => {
      // Check if the Clicked Letter === to one of the chosen
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // if letter is wrong
    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttempts++;
      // Add Class Wrong on the Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Sound Failed
      document.getElementById("fail").play();
      // check if wrongAttempts === 8
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Sound Success
      document.getElementById("success").play();
    }
  }
});
// End Game Func
function endGame() {
  // Create POPUP
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(
    `Game Over , The Word is ${randomValueValue}`,
  );
  // Append Text
  div.appendChild(divText);
  // Add Class On Div
  div.className = "popup";
  // Append to the Body
  document.body.appendChild(div);
}
