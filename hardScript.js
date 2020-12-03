const cards = document.querySelectorAll('.memory-card');

cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard,thirdCard,fourthCard;
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
      if(thirdCard == null){
        thirdCard = this;
      }
      else if(thirdCard != null){
        fourthCard = this;
        checkForMatch();
      }

    }
    
    return;
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework && firstCard.dataset.framework === thirdCard.dataset.framework && firstCard.dataset.framework === fourthCard.dataset.framework;
  
  isMatch ? (disableCards(),count++) : unflipCards();
  if(count == 6){
    setTimeout(() => {
      document.getElementsByTagName('section')[0].innerHTML = "<p>you win</p>";


    }, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  thirdCard.removeEventListener('click',flipCard);
  fourthCard.removeEventListener('click',flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    thirdCard.classList.remove('flip');
    fourthCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard,thirdCard,fourthCard] = [null, null,null,null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
}
