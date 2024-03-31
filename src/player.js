class Player {
    constructor(id, health, strength, attack) {
        // Input validation
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('Player ID must be a positive integer.');
        }
        if (!Number.isInteger(health) || health < 0) {
            throw new Error('Player health must be a non-negative integer.');
        }
        if (!Number.isInteger(strength) || strength < 0) {
            throw new Error('Player strength must be a non-negative integer.');
        }
        if (!Number.isInteger(attack) || attack < 0) {
            throw new Error('Player attack must be a non-negative integer.');
        }

        // Assign properties
        this.id = id;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    takeDamage(damage) {
        // Ensure damage is a non-negative integer
        if (!Number.isInteger(damage) || damage < 0) {
            throw new Error('Damage value must be a non-negative integer.');
        }

        // Apply damage
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

module.exports = Player;
