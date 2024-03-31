const Dice = require('./dice');
const Player = require('./player');
const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const players = [];
let attackingDice;
let defendingDice;

// Function to check whether the input is a valid positive integer
function isValidInput(input) {
    return typeof input === 'string' && /^[1-9]\d*$/.test(input);
}

// Ask for the number of players and information about each player
rl.question('Enter the number of players: ', (input) => {
    if (isValidInput(input)) {
        const numPlayers = parseInt(input);
        if (numPlayers >= 1) {
            askPlayerInfo(0, numPlayers);
        } else {
            console.log("Invalid number of players. Please enter a positive integer greater than 0.");
            rl.close();
        }
    } else {
        console.log("Invalid input for number of players. Please enter a positive integer greater than 0.");
        rl.close();
    }
});

// Function to get information about each player
function askPlayerInfo(index, numPlayers) {
    if(index === numPlayers && numPlayers === 1){
        console.log(`\nOnly one player is there. Hence Player ${players[0].id} won the game.`);
        rl.close();
        return;
    }
    if (index >= numPlayers) {
        console.log("\nLet us start the game now. ")
        startGame();
        return;
    }

    // Collecting attributes of each player (health, strength and attack).
    rl.question(`Enter health value of player ${index + 1}: `, (health) => {
        if (isValidInput(health)) {
            rl.question(`Enter strength value of player ${index + 1}: `, (strength) => {
                if (isValidInput(strength)) {
                    rl.question(`Enter attack value of player ${index + 1}: `, (attack) => {
                        if (isValidInput(attack)) {
                            players.push(new Player(index + 1, parseInt(health), parseInt(strength), parseInt(attack)));
                            askPlayerInfo(index + 1, numPlayers);
                        } else {
                            console.log(`Invalid input for player's attack value. Please enter a positive integer. Re-enter Player ${index+1} information.\n`);
                            askPlayerInfo(index, numPlayers);
                        }
                    });
                } else {
                    console.log(`Invalid input for player's strength value. Re-enter Player ${index+1} information.\n`);
                    askPlayerInfo(index, numPlayers);
                }
            });
        } else {
            console.log(`Invalid input for player's health value. Please enter a positive integer. Re-enter Player ${index+1} information.\n`);
            askPlayerInfo(index, numPlayers);
        }
    });
}

// For starting the game, we need the sides of attacking as well as defending dice.
function startGame() {
    rl.question('Enter number of sides of the attacking dice: ', (sides) => {
        if (isValidInput(sides)) {
            attackingDice = new Dice(sides);
            rl.question('Enter number of sides of the defending dice: ', (sides) => {
                if (isValidInput(sides)) {
                    defendingDice = new Dice(sides);
                    choosePlayers();
                } else {
                    console.log("Invalid input for defending dice sides. Please enter a positive integer. Re-enter the number of dice faces.\n");
                    startGame();
                }
            });
        } else {
            console.log("Invalid input for attacking dice sides. Please enter a positive integer. Re-enter the number of dice faces.\n");
            startGame();
        }
    });
}

// Choose which players will play the match.
function choosePlayers() {
    if (players.length === 0) {
        console.log("No player found to play. Game over!!!");
        rl.close();
        return;
    } else if (players.length === 1) {
        console.log(`Player ${players[0].id} won the game.`);
        rl.close();
        return;
    } else {

        // Selecting 2 players out of all to play a match.
        const indexA = Math.floor(Math.random() * players.length);
        const [playerA] = players.splice(indexA, 1);
        const indexB = Math.floor(Math.random() * players.length);
        const [playerB] = players.splice(indexB, 1);

        console.log(`\nChoosen players for the match are ${playerA.id} and ${playerB.id}`);

        // Play game and whoever wins is added back into the array. The player that has less health value starts the match.
        playerA.health <= playerB.health ? playGame(playerA, playerB) : playGame(playerB, playerA);
    }
}

// We assume that playerA is the attacking player and playerB is defending player at the beginning
function playGame(playerA, playerB) {
    rl.question(`Player ${playerA.id} -> Press enter to roll the dice`, (input1) => {
        const attackRoll = attackingDice.roll();
        const attackingStrength = attackRoll * playerA.attack;
        console.log(`You got ${attackRoll} on your dice roll and ${playerA.attack} is your attacking power. Hence, ${attackingStrength} is your attacking strength.`);

        rl.question(`Player ${playerB.id} -> Press enter to roll the dice`, (input1) => {
            const defendRoll = defendingDice.roll();
            const defendingStrength = defendRoll * playerB.strength;
            console.log(`You got ${defendRoll} on your dice roll and ${playerB.strength} is your defending power. Hence, ${defendingStrength} is your defending strength.`);

            // If attacking strength is greater than defending strength, then only damage will happen.
            if (attackingStrength > defendingStrength) {
                const damage = attackingStrength - defendingStrength;
                console.log(`Player ${playerB.id} has health ${playerB.health}.  Damage done to player ${playerB.id} is ${damage}.`)
                playerB.takeDamage(damage);

                // One player has won the game. Now we will choose players for the next match.
                if (playerB.health === 0) {
                    console.log(`Player ${playerA.id} has won the match as player ${playerB.id} has no health left. \n`);
                    players.push(playerA);
                    choosePlayers();
                    return;

                    // There will be loss of health to one player. Now in the next match, attacking player and defending player will be interchanged.
                } else {
                    console.log(`Player B has ${playerB.health} health left. \n`);
                    playGame(playerB, playerA);
                }
            } else {
                console.log("Since attacking power is less than defending power. There is no loss of health. We will proceed to next match. \n")

                // Even if there is no damage, in the next match, attacking player and defending player will be interchanged.
                playGame(playerB, playerA);
            }
        });
    });
}

// Handle close event of the readline interface
rl.on('close', () => {
    console.log("\nGAME OVER\n");
});