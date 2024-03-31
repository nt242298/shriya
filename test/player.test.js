const Player = require('../src/player.js');

describe('Player', () => {
    test('constructor sets properties correctly', () => {
        const player = new Player(1, 100, 10, 20);
        expect(player.id).toBe(1);
        expect(player.health).toBe(100);
        expect(player.strength).toBe(10);
        expect(player.attack).toBe(20);
    });

    test('constructor throws error for invalid ID', () => {
        expect(() => new Player('abc', 100, 10, 20)).toThrow('Player ID must be a positive integer.');
        expect(() => new Player(0, 100, 10, 20)).toThrow('Player ID must be a positive integer.');
        expect(() => new Player(-1, 100, 10, 20)).toThrow('Player ID must be a positive integer.');
    });

    test('constructor throws error for negative health, strength, and attack', () => {
        expect(() => new Player(1, -10, 10, 20)).toThrow('Player health must be a non-negative integer.');
        expect(() => new Player(1, 100, -10, 20)).toThrow('Player strength must be a non-negative integer.');
        expect(() => new Player(1, 100, 10, -20)).toThrow('Player attack must be a non-negative integer.');
    });

    test('takeDamage reduces player health correctly', () => {
        const player = new Player(1, 100, 10, 20);
        player.takeDamage(30);
        expect(player.health).toBe(70);
    });

    test('takeDamage does not reduce health below 0', () => {
        const player = new Player(1, 100, 10, 20);
        player.takeDamage(150);
        expect(player.health).toBe(0);
    });

    test('takeDamage throws error for negative damage', () => {
        const player = new Player(1, 100, 10, 20);
        expect(() => player.takeDamage(-30)).toThrow('Damage value must be a non-negative integer.');
    });

    test('takeDamage throws error for non-integer damage', () => {
        const player = new Player(1, 100, 10, 20);
        expect(() => player.takeDamage('abc')).toThrow('Damage value must be a non-negative integer.');
    });
});
