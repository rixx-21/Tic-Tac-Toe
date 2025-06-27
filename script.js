let turn = "O";
let total_turn = 0;
let winner = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const board_array = new Array(9).fill("E"); 

function checkWinner() {
    for (let [index0, index1, index2] of winner) {
        if (board_array[index0] != "E" && board_array[index0] === board_array[index1] && board_array[index1] === board_array[index2])
            return 1;
    }
    return 0;
}

const board = document.querySelector('.board')

let Fboy = document.getElementById('First_p')
let Sboy = document.getElementById('Second_p')
let Fboy_image = document.getElementById('Fboy_image');
let Sboy_image = document.getElementById('Sboy_image');
Fboy.style.color = "rgb(13, 236, 232)";
Fboy_image.style.transform = "scale(1.2)"

let PlayerO = document.getElementById('PlayerO');
let PlayerX = document.getElementById('PlayerX');
let playerOName = "Player O";
let playerXName = "Player X";

PlayerO.addEventListener('input', (event) => {
    playerOName = event.target.value;
});

PlayerX.addEventListener('input', (event) => {
    playerXName = event.target.value;
});

const printer = (event) => {
    console.log(event);
    const element = event.target;

    if (board_array[element.id] === "E") { 
        total_turn++;
        if (turn === "O") {
            element.innerHTML = "O";
            board_array[element.id] = "O";
            if (checkWinner()) {
                document.getElementById('winningMessage').innerHTML = `Winner is ${playerOName}`;
                board.removeEventListener('click', printer);
                return;
            }
            turn = "X";
        }
        else {
            element.innerHTML = "X";
            board_array[element.id] = "X";
            if (checkWinner()) {
                document.getElementById('winningMessage').innerHTML = `Winner is ${playerXName}`;
                board.removeEventListener('click', printer);
                return;
            }
            turn = "O";
        }
        if (turn === "O") {
            Fboy.style.color = "rgb(13, 236, 232)";
            Sboy.style.color = "white";
            Fboy_image.style.transform = "scale(1.2)";
            Sboy_image.style.transform = "scale(1)";
        } else {
            Sboy.style.color = "rgb(13, 236, 232)";
            Fboy.style.color = "white";
            Sboy_image.style.transform = "scale(1.2)";
            Fboy_image.style.transform = "scale(1)";
        }
        if (total_turn == 9) {
            document.getElementById('winningMessage').innerHTML = "Match is Draw";
            board.removeEventListener('click', printer);
        }
    }
}

board.addEventListener('click', printer);

const Restart = document.getElementById("restartButton");
Restart.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach((box) => box.innerHTML = "");
    board_array.fill("E");
    total_turn = 0;
    turn = "O";
    document.getElementById('winningMessage').innerHTML = "";
    board.addEventListener('click', printer);
    Fboy_image.style.transform = "scale(1.2)"
    Sboy_image.style.transform = "scale(1)"
    PlayerO.value = "";
    PlayerX.value = "";
    playerOName = "Player O";
    playerXName = "Player X";
    Fboy.style.color = "rgb(13, 236, 232)";
    Sboy.style.color = "white";
})
