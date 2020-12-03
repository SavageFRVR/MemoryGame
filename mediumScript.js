//Stores all the cards
const cards = document.querySelectorAll('.memory-card');

//Listens for click and then runs the function flip card when i click on the card
cards.forEach(card => card.addEventListener('click', flipCard));

//Variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard,thirdCard;
let count = 0;

shuffle();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    
    return;
  }

  else if(hasFlippedCard){
    if(secondCard == null){
      secondCard = this;
      
    }
    else if(secondCard != null){
      thirdCard = this;
      
      checkForMatch();
    }
    
    
    return;
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework && firstCard.dataset.framework === thirdCard.dataset.framework;
  
  isMatch ? (disableCards(),count++) : unflipCards();
  if(count == 8){
   setTimeout(() => {
    document.getElementsByTagName('section')[0].innerHTML = "<p>you win</p>";

    
  }, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  thirdCard.removeEventListener('click',flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    thirdCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard,thirdCard] = [null, null,null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
}

