import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
const resetbutton = document.getElementById("reset");
const resetdiv = document.getElementById("btn");
resetbutton.addEventListener('click', reset);
let firstCard = null;
let secondCard = null;
let lockBoard = false;
const cardsfound = [];
const cardsonboard = [];
var yritykset = 0;
var pariloydetty;
const valikoima = document.getElementById("valikko")



function shuffle(array) {
    let i = array.length;
    while (i != 0) {
        let randomi = Math.floor(Math.random() * i);
        i--;
        [array[i], array[randomi]] = [array[randomi], array[i]];
  }    
}

export function createBoard(cardCount) {
    valikoima.style.display = "none"
    pariloydetty = new sound("pariloydetty.mp3")
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    resetdiv.style.display = "none"
    shuffle(cards);
    cards.forEach(card => {
        cardcounter(card);
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', () => flipCard(cardElement, handleCardFlip, lockBoard));
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    pariloydetty.play();
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsfound.push(firstCard);
    cardsfound.push(secondCard);
    if(cardsfound.length == cardsonboard.length){
        resetBoard();
        ending();
    } else {
        resetBoard();
    }
    
}

function unflipCards() {
    lockBoard = true;
    yritykset += 1
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function cardcounter(card) {
    cardsonboard.push(card);

}

function reset() {
    yritykset = 0
    document.getElementById("yritykset").innerHTML = ""
    valikoima.style.display = "block"
    resetdiv.style.display = "none"
}

function ending() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.lastChild);
    }
    document.getElementById("yritykset").innerHTML = "Väärät yritykset" + " " + yritykset
    resetdiv.style.display = "block"
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
