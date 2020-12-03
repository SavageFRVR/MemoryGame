//Stores all the cards
const cards = document.querySelectorAll('.memory-card');

//Listens for click and then runs the function flip card when i click on the card
cards.forEach(card => card.addEventListener('click', flipCard));


//Variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;

shuffle();

function flipCard() {
  if (lockBoard) return;//Stops the user from adding more clicks in the event that card is not matched.

  if (this === firstCard) return;//Makes sure the user doesnt keep selecting the same card

  this.classList.add('flip');//Adds the flip animation to a card

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this; //stores the clicked card

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;//Learnt about the dataset from W3, it basically is used to store custom data private to the page or application.

  isMatch ? (disableCards(),count++) : unflipCards(); //Tried ternary but i dont fully understand it yet. I prefer use the if/else.
  
  if(count == 12){
    setTimeout(() => {
    document.getElementsByTagName('section')[0].innerHTML = "<p>you win</p>"; //This is just a cool win screen i added.
  }, 1000);
    
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

//I got this from https://www.w3schools.com/jsref/met_win_settimeout.asp
  setTimeout(() => { 
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Found this  shuffe code on https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
}