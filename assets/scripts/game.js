let game = {
    balls: ["ball1", "ball2", "ball3", "ball4", "ball5"],
    currentGame: [],
    lastButton: "",
    movesLeft: 0,
    numberOfTurns: 0,
    playerMoves: [],
    score: 0,
    sounds: {
        ball1: new Audio((src = "assets/audio/sound_ball1.mp3")),
        ball2: new Audio((src = "assets/audio/sound_ball2.mp3")),
        ball3: new Audio((src = "assets/audio/sound_ball3.mp3")),
        ball4: new Audio((src = "assets/audio/sound_ball4.mp3")),
        ball5: new Audio((src = "assets/audio/sound_ball5.mp3")),
        success: new Audio((src = "assets/audio/sound_success.mp3")),
    },
    turnInProgress: false,
};

document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("mvzgNnjxhZaW8DI7r");
    showInstructions();
});

const showInstructions = () => {
    try {
        const instructions = document.getElementById("instructions");
        if (instructions) {
            instructions.style.display = "flex";
        } else {
            console.error("Element with id `instructions` not found.");
            displayErrorModal(
                "Sorry, Element with id `instructions` not found! The error has been logged to the console. Please try again.",
            );
        }
    } catch (error) {
        console.error("Error in showInstructions function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the showInstructions function! The error has been logged to the console. Please try again.",
        );
    }
};

const closeInstructions = () => {
    try {
        const instructions = document.getElementById(`instructions`);
        if (instructions) {
            instructions.style.display = "none";
        } else {
            console.error("Element with id `instructions` not found.");
            displayErrorModal(
                "Sorry, Element with id 'instructions' not found! The error has been logged to the console. Please try again.",
            );
        }
    } catch (error) {
        console.error("Error in closeInstructions function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the closeInstructions function! The error has been logged to the console. Please try again.",
        );
    }
};

const showContact = () => {
    try {
        const contactFormModal = document.getElementById("contactFormModal");
        if (contactFormModal) {
            contactFormModal.style.display = "flex";
        } else {
            console.error("Element with id `contactFormModal` not found.");
            displayErrorModal(
                "Sorry, Element with id `contactFormModal` not found! The error has been logged to the console. Please try again.",
            );
        }
    } catch (error) {
        console.error("Error in showForm function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the showForm function! The error has been logged to the console. Please try again.",
        );
    }
};

const closeContact = () => {
    try {
        const contactFormModal = document.getElementById("contactFormModal");
        if (contactFormModal) {
            contactFormModal.style.display = "none";
        } else {
            console.error("Element with id `contactFormModal` not found.");
            displayErrorModal(
                "Sorry, Element with id `contactMFormModal` not found! The error has been logged to the console. Please try again.",
            );
        }
    } catch (error) {
        console.error("Error in closeForm function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the closeForm function! The error has been logged to the console. Please try again.",
        );
    }
};

const submitContactForm = () => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const templateParams = {
        from_email: email,
        from_name: name,
        message: message,
    };
    emailjs.send("service_2n03ojy", "Memory Game", templateParams).then(
        () => {
            displayErrorModal("Email sent successfully!");
            closeContact();
        },
        (error) => {
            console.error("Email sending failed!", error);
            displayErrorModal(
                "Sorry, An error occurred while sending the email. The error has been logged to the console. Please try again.",
            );
        },
    );
};

const ballClicked = (ball) => {
    try {
        ball.addEventListener("click", (e) => {
            if (game.currentGame.length > 0 && !game.turnInProgress) {
                let playerMove = e.target.getAttribute("id");
                game.lastButton = playerMove;
                highlightBall(playerMove);
                game.playerMoves.push(playerMove);
                game.movesLeft--;
                const leftElement = document.getElementById("left");
                if (leftElement) {
                    leftElement.innerText = game.movesLeft;
                } else {
                    throw new Error("Element with id 'left' not found.");
                }
                playerTurn();
            }
        });
        ball.setAttribute("data-listener", "true");
    } catch (error) {
        console.error(error.message);
        displayErrorModal(
            "Sorry, an error occurred with the ballClicked function! The error has been logged to the console. Please try again.",
        );
    }
};

const newGame = () => {
    try {
        game.currentGame = [];
        game.playerMoves = [];
        game.score = 0;
        game.movesLeft = 0;
        let balls = document.getElementsByClassName("ball");
        for (let ball of balls) {
            if (!ball.hasAttribute("data-listener")) {
                ballClicked(ball);
            }
        }
        scoreDisplay();
        newTurn();
    } catch (error) {
        console.error("Error in newGame function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the newGame function! The error has been logged to the console. Please try again.",
        );
    }
};

const newTurn = () => {
    try {
        game.playerMoves = [];
        game.currentGame.push(game.balls[Math.floor(Math.random() * 5)]);
        game.movesLeft = game.currentGame.length;
        const leftElement = document.getElementById("left");
        if (leftElement) {
            leftElement.innerText = game.movesLeft;
        } else {
            console.error("Element with id 'left' not found.", error);
            displayErrorModal(
                "Sorry, Element with id 'left' not found! The error has been logged to the console. Please try again.",
            );
        }
        showTurns();
        if (game.timer) {
            clearInterval(game.timer);
            game.timer = null;
        }
    } catch (error) {
        console.error("Error in newTurn function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the newTurn function! The error has been logged to the console. Please try again.",
        );
    }
};

const scoreDisplay = () => {
    try {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.innerText = game.score;
        } else {
            console.error("Element with id 'score' not found.", error);
            displayErrorModal(
                "Sorry, Element with id 'score' not found! The error has been logged to the console. Please try again.",
            );
        }
    } catch (error) {
        console.error("Error in scoreDisplay function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the scoreDisplay function! The error has been logged to the console. Please try again.",
        );
    }
};

const highlightBall = (ball) => {
    try {
        let audioElement = document.getElementById("sound_" + ball);
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play();
        } else {
            console.warn(`Audio element for ball ${ball} not found.`, error);
            displayErrorModal(
                `Sorry, Audio element for ball ${ball} not found! The error has been logged to the console. Please try again.`,
            );
        }
        const ballElement = document.getElementById(ball);
        if (ballElement) {
            ballElement.classList.add("highlight");
            setTimeout(() => {
                ballElement.classList.remove("highlight");
            }, 300);
        } else {
            console.error(`Element with id ${ball} not found.`, error);
            displayErrorModal(
                `Sorry, Element with id ${ball} not found! The error has been logged to the console. Please try again.`,
            );
        }
    } catch (error) {
        console.error("Error in highlightBall function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the highlightBall function! The error has been logged to the console. Please try again.",
        );
    }
};

const showTurns = () => {
    try {
        game.turnInProgress = true;
        game.numberOfTurns = 0;

        const leftElement = document.getElementById("left");
        if (!leftElement) {
            throw new Error("Element with id 'left' not found.");
        }
        let turns = setInterval(() => {
            leftElement.innerText = game.movesLeft;
            highlightBall(game.currentGame[game.numberOfTurns]);
            game.numberOfTurns++;
            if (game.numberOfTurns >= game.currentGame.length) {
                clearInterval(turns);
                game.turnInProgress = false;
                startTimer();
            }
        }, 800);
    } catch (error) {
        console.error("Error in showTurns function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the showTurns function! The error has been logged to the console. Please try again.",
        );
    }
};

const playerTurn = () => {
    try {
        let i = game.playerMoves.length - 1;
        if (game.currentGame[i] === game.playerMoves[i]) {
            if (game.currentGame.length === game.playerMoves.length) {
                clearInterval(game.timer);
                game.score++;
                game.movesLeft = 1;
                scoreDisplay();
                game.sounds.success.play();
                game.turnInProgress = true;
                setTimeout(() => {
                    newTurn();
                }, 1000);
            }
        } else {
            clearInterval(game.timer);
            game.turnInProgress = true;
            displayErrorModal("We're sorry, that was the wrong ball! Please start a new game.");
        }
    } catch (error) {
        console.error("Error in playerTurn function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the playerTurn function! The error has been logged to the console. Please try again.",
        );
    }
};

const startTimer = () => {
    try {
        if (game.timer) return;
        let timeLeft = game.currentGame.length * 2;
        updateTimerDisplay(timeLeft);
        game.timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(game.timer);
                displayErrorModal("We're sorry, your time's up! Please start a new game.");
            }
        }, 1000);
    } catch (error) {
        console.error("Error in startTimer function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the startTimer function! The error has been logged to the console. Please try again.",
        );
    }
};

const updateTimerDisplay = (seconds) => {
    try {
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerText = seconds;
        } else {
            console.error("Element with id 'timer' not found.", error);
            displayErrorModal(
                "Sorry, Element with id 'timer' not found! The error has been logged to the console. Please try again.",
            );
        }
    } catch (error) {
        console.error("Error in updateTimerDisplay function!", error);
        displayErrorModal(
            "Sorry, An error occurred with the updateTimerDisplay function! The error has been logged to the console. Please try again.",
        );
    }
};

const displayErrorModal = (message) => {
    const modal = document.getElementById("errorModal");
    const modalMessage = document.getElementById("errorModalMessage");
    if (modal && modalMessage) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }
};

const closeErrorModal = () => {
    const modal = document.getElementById("errorModal");
    if (modal) {
        modal.style.display = "none";
    }
};