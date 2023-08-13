let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    balls: ["ball1", "ball2", "ball3", "ball4", "ball5"],
    numberOfTurns: 0,
    turnInProgress: false,
    lastButton: "",
};


function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    let balls = document.getElementsByClassName("ball");
    for (let ball of balls) {
        if (!ball.hasAttribute("data-listener")) {
            ball.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let playerMove = e.target.getAttribute("id");
                    game.lastButton = move;
                    highlightBall(playerMove);
                    game.playerMoves.push(playerMove);
                    playerTurn();
                }
            });
            ball.setAttribute("data-listener", "true");
        }
    }
    scoreDisplay();
    newTurn();
}

function newTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.balls[(Math.floor(Math.random() * 5))]);
    showTurns()
}

function scoreDisplay() {
    document.getElementById("score").innerText = game.score;
}

function highlightBall(ball) {
    document.getElementById(ball).classList.add("highlight");
    setTimeout(() => {
        document.getElementById(ball).classList.remove("highlight");
    }, 300);
}

function showTurns() {
    game.numberOfTurns = 0;
    let turns = setInterval(() => {
        highlightBall(game.currentGame[game.numberOfTurns]);
        game.numberOfTurns++;
        if (game.numberOfTurns >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 600);
}


function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            scoreDisplay();
            setTimeout(() => {
                newTurn();
            }, 1000);
        }
    } else {
        alert("We're sorry, that was the wrong ball! Please start a new game.");
    }
}

// module.exports = { game, newGame, scoreDisplay, newTurn };