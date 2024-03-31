const Dice = require('../src/dice.js');

describe('Dice', () => {
    test('constructor sets sides correctly', () => {
        const dice = new Dice(6);
        expect(dice.sides).toBe(6);
    });

    test('roll returns a valid value within the range', () => {
        const sides = 6;
        const dice = new Dice(sides);
        const result = dice.roll();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(sides);
    });

    test('roll returns an integer value', () => {
        const dice = new Dice(6);
        const result = dice.roll();
        expect(Number.isInteger(result)).toBe(true);
    });

    test('roll returns different values for subsequent calls', () => {
        const dice = new Dice(6);
        const results = new Set();
        for (let i = 0; i < 1000; i++) {
            results.add(dice.roll());
        }
        expect(results.size).toBeGreaterThan(1);
    });

    test('constructor throws error for non-numeric sides', () => {
        expect(() => new Dice('abc')).toThrow('Number of sides must be a positive integer.');
    });

    test('constructor throws error for non-positive sides', () => {
        expect(() => new Dice(0)).toThrow('Number of sides must be a positive integer.');
        expect(() => new Dice(-1)).toThrow('Number of sides must be a positive integer.');
    });
});
