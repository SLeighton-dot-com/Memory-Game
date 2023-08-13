let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    balls: ["ball1", "ball2", "ball3", "ball4", "ball5"],
    
};


function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    scoreDisplay();
    newTurn();
}

function newTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.balls[(Math.floor(Math.random() * 4))]);
}

function scoreDisplay() {
    document.getElementById("score").innerText = game.score;
}

function highlightBall(ball) {
    document.getElementById(ball).classList.add("highlight");
    setTimeout(function () {
        document.getElementById(ball).classList.remove("highlight");
    }, 300);
}

// module.exports = { game, newGame, scoreDisplay, newTurn };