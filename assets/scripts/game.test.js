/**
 * @jest-environment jsdom
 */

const { game, newGame, scoreDisplay } = require("./game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score exists", () => {
        expect("score" in game).toEqual(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toEqual(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toEqual(true);
    });
    test("choices key exists", () => {
        expect("balls" in game).toEqual(true);
    });
    test("choices contain correct ids", () => {
        expect(game.balls).toEqual(["ball1", "ball2", "ball3", "ball4", "ball5"]);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["ball1", "ball2"];
        game.currentGame = ["ball1", "ball2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear the computer sequence array", () => {
        expect(game.currentGame.length).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});