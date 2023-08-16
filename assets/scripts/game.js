let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    balls: ["ball1", "ball2", "ball3", "ball4", "ball5"],
    numberOfTurns: 0,
    turnInProgress: false,
    lastButton: "",
    movesLeft: 0,
    sounds: {
        ball1: new Audio(src="assets/audio/sound_ball1.mp3"),
        ball2: new Audio('assets/audio/sound_ball2.mp3'),
        ball3: new Audio('assets/audio/sound_ball3.mp3'),
        ball4: new Audio('assets/audio/sound_ball4.mp3'),
        ball5: new Audio('passets/audio/sound_ball5.mp3')
    }
};

document.addEventListener("DOMContentLoaded", function () {
    showOverlay();
});

function showOverlay() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}


function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    game.movesLeft = 0;
    let balls = document.getElementsByClassName("ball");
    for (let ball of balls) {
        if (!ball.hasAttribute("data-listener")) {
            ball.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let playerMove = e.target.getAttribute("id");
                    game.lastButton = playerMove;
                    highlightBall(playerMove);
                    game.playerMoves.push(playerMove);
                    game.movesLeft--; 
                    document.getElementById("left").innerText = game.movesLeft;
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
    game.movesLeft = game.currentGame.length;  
    showTurns();
    if (game.timer) {
        clearInterval(game.timer);
        game.timer = null;
    }
}

function scoreDisplay() {
    document.getElementById("score").innerText = game.score;
}

function highlightBall(ball) {
    let audioElement = document.getElementById("sound_" + ball);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    } // Play the sound for the ball
    document.getElementById(ball).classList.add("highlight");
    setTimeout(() => {
        document.getElementById(ball).classList.remove("highlight");
    }, 300);
}

function showTurns() {
    game.turnInProgress = true;
    game.numberOfTurns = 0;
    let turns = setInterval(() => {
        document.getElementById("left").innerText = game.movesLeft;
        highlightBall(game.currentGame[game.numberOfTurns]);
        game.numberOfTurns++;
        if (game.numberOfTurns >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
            startTimer();
        }
    }, 800);
}


function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {       
        if (game.currentGame.length === game.playerMoves.length) {
            clearInterval(game.timer);
            game.score++;            
            game.movesLeft = 1;
            scoreDisplay();
            setTimeout(() => {
                newTurn();
            }, 1000);
        }
    } else {
        clearInterval(game.timer);
        alert("We're sorry, that was the wrong ball! Please start a new game.");
    }
}

function startTimer() {
    if (game.timer) return;
    let timeLeft = game.currentGame.length * 2;
    updateTimerDisplay(timeLeft);
    game.timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(game.timer);
            alert("We're sorry, your time's up! Please start a new game.");
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    document.getElementById("timer").innerText = seconds;
}

// module.exports = { game, newGame, scoreDisplay, newTurn };