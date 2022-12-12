import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url);
const p1 = chalk.bgMagenta;
const p2 = chalk.bgGreen;

const getCalories = () => {
    return input.replace(/\r/g, "")
        .trim()
        .split("\n\n")
        .map((elf) => {
            const calories = elf.split("\n").map(Number);
            return calories.reduce((previous, current) => previous + current, 0);
        });
}

function part1() {
    log(p1(' Part 1 Answer: ') + ' ' + Math.max(...getCalories()));
}

function part2() {
    const calories = getCalories().sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((previous, current) => previous + current, 0);

    log(p2(' Part 2 Answer: ') + ' ' + calories);
}

part1();
part2();