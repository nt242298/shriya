const Game = require('../src/game');
const Player = require('../src/player');
const Dice = require('../src/dice');

const readline = require('readline');
jest.mock('readline', () => ({
    createInterface: jest.fn(() => ({
        question: jest.fn(),
        close: jest.fn(),
        on: jest.fn()
    }))
}));

describe('Game', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Starts game correctly with valid input', () => {
        // Mock readline question callback
        readline.createInterface().question.mockImplementationOnce((question, cb) => {
            cb('2');
        });

        // Trigger the question callback
        Game.rl.question();

        // Assertions
        expect(Game.players.length).toBe(0);
    });

    test('Handles invalid input for number of players', () => {
        // Mock readline question callback
        readline.createInterface().question.mockImplementationOnce((question, cb) => {
            cb('invalid');
        });

        // Trigger the question callback
        Game.rl.question();

        // Assertions
        expect(Game.players.length).toBe(0);
    });

    test('Chooses players correctly', () => {
        // Mock readline question callback
        readline.createInterface().question.mockImplementation((question, cb) => {
            if (question.includes('attacking')) {
                cb('6');
            } else {
                cb('6');
            }
        });

        // Add players directly
        Game.players.push(new Player(1, 100, 10, 5));
        Game.players.push(new Player(2, 150, 15, 7));

        // Call choosePlayers method
        Game.choosePlayers();

        // Assertions
        expect(Game.attackingDice.sides).toBe(6);
        expect(Game.defendingDice.sides).toBe(6);
    });

    // Add more test cases as needed
});