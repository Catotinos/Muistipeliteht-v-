import { createBoard } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const valikoima = document.getElementById("valikko")
    valikoima.display = "block"
    let kahdkesan = document.getElementById("8");
    let kuusi = document.getElementById("16");
    let kolmekaksi = document.getElementById("32");
    kahdkesan.addEventListener("click", function () {
    startgame(8)
});
    kuusi.addEventListener("click", function () {
    startgame(16)
});
    kolmekaksi.addEventListener("click", function () {
    startgame(32)
});
    function startgame(cardCount){
        createBoard(cardCount);
    }
});