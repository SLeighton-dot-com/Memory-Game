/**
 * @jest-environment jsdom
 */

const { game } = require("./game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("balls" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.balls).toEqual(["ball1", "ball2", "ball3", "ball4", "ball5"]);
    });
});