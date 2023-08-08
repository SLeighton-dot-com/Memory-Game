let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    balls: ["ball1", "ball2", "ball3", "ball4", "ball5"]
};


function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    scoreDisplay();
}

function scoreDisplay() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, scoreDisplay };