//deklarera variabel
let numberOfWrongGuesses = 0;
let numberOfRightGuesses = 0;

//lyssnar efter knapptryckning och fångar värdet
window.addEventListener(
  "keydown",
  function (e) {
    checkIfLetter(e.key);
  },
  false
);

//Skapa en ordlista samt array för hangman samt felaktiga gissningar
const wordArray = ["kaka", "word", "sentence", "cookie"];
const hangMan = ["ground", "scaffold", "legs", "arms", "body", "head"];
const guessedLetters = [];
const correctGuesses = [];

//välj ordet som skall gissas
const wordToGuess =
  wordArray[Math.floor(Math.random() * wordArray.length)].split("");
console.log(wordToGuess);
//Skapa gissnings låda. Tom rad för varje bokstav.
for (let i = 0; i < wordToGuess.length; i++) {
  let wordBox = document.createElement("div"); //Skapar ett nytt div-element
  wordBox.classList.add("wordBox");
  let letterBox = document.createElement("h1"); //Skapar ett h1-element

  letterBox.classList.add(wordToGuess[i]); //Ger respektive h1-element sin egen klass för framtida jämförelser
  wordBox.appendChild(letterBox); //Lägger letterbox i wordbox
  document.getElementById("wordToGuess").appendChild(wordBox);
}
//Kontrollerar inputvärde så att det enbart är en bokstav och inte en siffra och kör sedan jämförelsen
function checkIfLetter(input){
    if(!/\d/.test(input) && typeof input === "string" && input.length === 1){
        letterComparision(input)
    }
}

//Skapa funktion som kontrollerar om bokstaven stämmer eller inte.
//Om du gissat fel skall en del av hangman dyka upp

function letterComparision(input) {
  let doesLetterExist = false;
  for (let i = 0; i < wordToGuess.length; i++) {
    if (input === wordToGuess[i]) {
      doesLetterExist = true;
    }
    if (doesLetterExist && !correctGuesses.includes(input)) {
      const lettersToWrite = document.querySelectorAll(`.${wordToGuess[i]}`);
      lettersToWrite.forEach((letter) => {
        letter.innerText = wordToGuess[i];
        correctGuesses.push(wordToGuess[i])
      });
      
      if(correctGuesses.length == wordToGuess.length ){
        let winWindow = document.createElement('div')
        winWindow.classList.add("winWindow")
        
        let winImage = document.createElement("img")
        winImage.src = "giphy.gif"
        winWindow.appendChild(winImage)
        let winMessage = document.createElement('h2')
        winMessage.innerText = "YOU WIN!"
        winWindow.appendChild(winMessage)
        let playAgainButton = document.createElement('button')
        playAgainButton.innerText = 'play again'
        playAgainButton.onclick = refreshSite
        winWindow.appendChild(playAgainButton)
        document.querySelector('body').appendChild(winWindow)
      }
      break;
    }
  }
if(!doesLetterExist && !guessedLetters.includes(input)){
    
 let newWrongLetter = document.createElement("h2")
 newWrongLetter.innerText = input
 document.getElementById("wrongGuesses").appendChild(newWrongLetter);
 guessedLetters.push(input)

 document.getElementById(hangMan[numberOfWrongGuesses]).style.display = "block";

 numberOfWrongGuesses ++ // Ökar antalet felgissningar

 if(numberOfWrongGuesses == hangMan.length){
    console.log('något')
    let loseWindow = document.createElement('div')
    loseWindow.classList.add("winWindow")
        
        let loseImage = document.createElement("img")
        loseImage.src = "giphy.gif"
        loseWindow.appendChild(loseImage)
        let loseMessage = document.createElement('h2')
        loseMessage.innerText = "YOU LOSE!"
        let correctWord = document.createElement('p')
        correctWord.innerText = "The word was: " + wordToGuess.join('')
        loseWindow.appendChild(loseMessage)
        loseWindow.appendChild(correctWord)
        let playAgainButton = document.createElement('button')
        playAgainButton.innerText = 'play again'
        playAgainButton.onclick = refreshSite
        loseWindow.appendChild(playAgainButton)
        document.querySelector('body').appendChild(loseWindow)
      
   
}
}
}

function refreshSite(){
    window.location = "index.html"
}
//Om svaret stämmer skall bokstaven visas på korrekt plats i gissningslådan.

//Om svaret inte stämmet skall bokstaven visas i wrongGuesses + en del av hangman skall visas.

//Match slut, testa igen?
//Vinst
//Förlust
