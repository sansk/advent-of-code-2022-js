// Starter file for all Days

// Import the index.js & log (console.log) from utils to read the input from the file
import { getInput, log } from '../utils/index.js';
import chalk from 'chalk'; // For console message styles.

// Use the getInput to read from input.txt file into 'input' variable
const input = getInput(import.meta.url);

// Do stuff

function part1() {
    //Do Part 1 of the challenge
    log(chalk.bgMagenta(' Part 1 Answer: ') + ' ' );
}

function part2() {
    //Do Part 2 of the challenge/
    //Part 2 of the challenge opens only when you succesfully complete the part 1 challenge
}

// Execute part1 & part 2
part1();
part2();