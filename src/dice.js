class Dice {
    constructor(sides) {
        const parsedSides = parseInt(sides);
        if (isNaN(parsedSides) || parsedSides <= 0) {
            throw new Error('Number of sides must be a positive integer.');
        }
        this.sides = parsedSides;
    }

    roll() {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

module.exports = Dice;
