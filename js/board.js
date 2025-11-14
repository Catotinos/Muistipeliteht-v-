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

function shuffle(array) {
    let i = array.length;
    while (i != 0) {
        let randomi = Math.floor(Math.random() * i);
        i--;
        [array[i], array[randomi]] = [array[randomi], array[i]];
  }    
}

export function createBoard(cardCount) {
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
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
    createBoard(cardCount);
}

function ending() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.lastChild);
    }
    resetdiv.style.display = "block"
}