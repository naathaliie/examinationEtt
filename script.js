//deklarera variabel
//Skapa en ordlista samt array för hangman samt felaktiga gissningar
//Om svaret stämmer skall bokstaven visas på korrekt plats i gissningslådan.

//Om svaret inte stämmet skall bokstaven visas i wrongGuesses + en del av hangman skall visas.

//Match slut, testa igen?
//Vinst
//Förlust

//Array med ord, dessa alla kan komma att behöva gissas.
const wordArray = [
  "ENCYCLOPEDIA",
  "NATIONAL",
  "ALPHABET",
  "COOKIE",
  "SUITE",
  "HAMSTER",
  "LAMB",
  "PANTHER",
  "LEMUR",
  "LOVEBIRD",
  "SLOTH",
  "EAGLE",
  "MARMOSET",
  "BUNNY",
  "HIGHLAND",
  "CHIPMUNK",
  "MOUSE",
  "ZEBU",
  "STEER",
  "STARFISH",
  "SILVER",
  "HORSE",
  "MOOSE",
  "FROG",
];

//välj ordet som skall gissas
const wordToGuess =
  wordArray[Math.floor(Math.random() * wordArray.length)].split("");
console.log(wordToGuess);

//Array med ID på alla delar av SVG bilden som visas när man förlorar, dessa används för att kalla på ID och ge dem display:block när dem skall visas.
const hangMan = ["ground", "scaffold", "head", "body", "arms", "legs"];

//Ljudfil som spelas när man förlorar
let beat = new Audio("dark-souls-_you-died_-sound-effect-from-youtube.mp3");

//lyssnar efter knapptryckning och fångar värdet
window.addEventListener(
  "keydown",
  function (e) {
    letterComparision(e.key.toUpperCase());
  },
  false
);

//Arrayer som används för att hålla koll på vad som redan gissats korrekt så du ej kan gissa samma fel eller rätt flera gånger.
const guessedLetters = [];
const correctGuesses = [];

//Skapar en div och ett h1 element för varje bokstav som finns i ordet som skall gissas.
//Ger också klass till divven samt till h1 som är samma bokstav som skall gissas.
//Exempel: FROG: 4 h1 skapas med klasserna: F, R, O och G. Detta görs för att sedan enklare kunna ställa bokstäverna på korrekt plats.
//Dessa läggs sedan ut i den förberedda containern.
for (let i = 0; i < wordToGuess.length; i++) {
  let wordBox = document.createElement("div");
  wordBox.classList.add("wordBox");
  let letterBox = document.createElement("h1");
  letterBox.classList.add(wordToGuess[i]);
  wordBox.appendChild(letterBox);
  document.getElementById("wordToGuess").appendChild(wordBox);
}

//Huvudfunktion. Tar in bokstaven och gör:
function letterComparision(input) {
  //Skapa bool för kontroller
  let doesLetterExist = false;

  //Säkerställer att enbart enstaka bokstäver kommer in.
  if (/[A-Z]/.test(input) && typeof input === "string" && input.length === 1) {
    //kontrollerar om input finns i ordet som skall gissas, sätter isåfall boolen till true.
    for (let i = 0; i < wordToGuess.length; i++) {
      if (input === wordToGuess[i]) {
        doesLetterExist = true;
      }
      //Kontrollerar så att bokstaven inte gissats korrekt redan med hjälp av arrayn correctGuesses.
      //om den inte har gjort det och boolen är true så selectas alla h1or med samma klass som bokstaven.
      //Exempel: frog, f är input och f är klassnamn på en h1. alla h1or med den bokstaven som klassnamn skrivs sedan ut i en foreach loop.
      //Till sist uppdateras correctGuesses så samma bokstav inte kan gissas korrekt igen.
      if (doesLetterExist && !correctGuesses.includes(input)) {
        const lettersToWrite = document.querySelectorAll(`.${wordToGuess[i]}`);
        lettersToWrite.forEach((letter) => {
          letter.innerText = wordToGuess[i];
          correctGuesses.push(wordToGuess[i]);
        });
        //Ifall arrayn som håller koll på korrekta gissningar är lika lång som ordet som skall gissas har du gissat rätt på allt.
        //Då körs vinstfunktionen med en 500ms timeout
        if (correctGuesses.length == wordToGuess.length) {
          setTimeout(() => {
            wonGameFunction();
          }, 500);
        }
        break;
      }
    }
    //Om bool är falsk (input finns ej att hitta i ordet som skall gissas)
    //guessedLetters används för att hålla koll på att du inte kan gissa samma felaktiga bokstav flera gånger.
    //Om båda dessa är falska så skapas ett h2 element med den nya felaktiga gissningen som text,
    //Denna läggs ut i containern för felaktiga gissningar, den felaktiga gissningen sparas
    //Till sist visas en del av SVGn
    if (!doesLetterExist && !guessedLetters.includes(input)) {
      document.getElementById(hangMan[guessedLetters.length]).style.display =
        "block";
      let newWrongLetter = document.createElement("h2");
      newWrongLetter.classList.add("wrongLetterUnit");
      newWrongLetter.innerText = input;
      document
        .getElementById("wrongLetterContainer")
        .appendChild(newWrongLetter);
      guessedLetters.push(input);

      //Om mängden felaktiga gissningar är samma som längden på SVG arrayn har du slut på chanser
      //Då körs förlustfunktionen med en 1sekund delay så du kan se sista biten av bilden.
      if (guessedLetters.length === hangMan.length) {
        setTimeout(() => {
          lostGameFunction();
        }, 1000);
      }
    }
  }
}

//Funktionen skapar en div och ger den klasslista för CSS så den visas i mitten av skärmen.
//I fönstret skapas en bild, en h2a och en knapp för att spela igen.
function wonGameFunction() {
  let winWindow = document.createElement("div");
  winWindow.classList.add("winWindow");

  let winImage = document.createElement("img");
  winImage.src = "snoopDogg.gif";
  winWindow.appendChild(winImage);
  let winMessage = document.createElement("h2");
  winMessage.innerText = "YOU WIN!";
  winWindow.appendChild(winMessage);
  let playAgainButton = document.createElement("button");
  playAgainButton.classList.add("buttons");
  playAgainButton.innerText = "play again";
  playAgainButton.onclick = refreshSite;
  winWindow.appendChild(playAgainButton);
  document.querySelector("body").appendChild(winWindow);
}
//funktionen gör samma sak som förra. Utöver detta spelar den även förlustljudet samt skriver ut vad det korrekta ordet var.
function lostGameFunction() {
  beat.play();
  console.log("något");
  let loseWindow = document.createElement("div");
  loseWindow.classList.add("winWindow");

  let loseImage = document.createElement("img");
  loseImage.src = "youDied.gif";
  loseWindow.appendChild(loseImage);
  let loseMessage = document.createElement("h2");
  loseMessage.innerText = "YOU DIED!";
  let correctWord = document.createElement("h3");
  correctWord.innerText = "The word was: " + wordToGuess.join("");
  loseWindow.appendChild(loseMessage);
  loseWindow.appendChild(correctWord);
  let playAgainButton = document.createElement("button");
  playAgainButton.classList.add("buttons");
  playAgainButton.innerText = "play again";
  playAgainButton.onclick = refreshSite;
  loseWindow.appendChild(playAgainButton);
  document.querySelector("body").appendChild(loseWindow);
}
//För att spela igen.
function refreshSite() {
  window.location = "index.html";
}
