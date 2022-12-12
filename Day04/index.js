import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url);
const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const inputLines = input.replace(/\r/g, "")
    .trim()
    .split("\n");

const lineSplit = (line) => {
    return line.split(",")
        .map((interval) => interval.split("-").map(Number))
        .sort((a, b) => {
            const oneSize = a[1] - a[0];
            const twoSize = b[1] - b[0];
            return twoSize - oneSize;
        });
}

function part1() {
    const res = inputLines.map((line) => {
        const [first, second] = lineSplit(line);

        const oneFullContainsTwo = first[0] <= second[0] && first[1] >= second[1];

        return oneFullContainsTwo ? 1 : 0;
    });
    log(p1(' Part 1 Answer: '));
    log(t1('The number of assignment pairs in one range that fully contain the other - ') + res.reduce((a, b) => a + b, 0) + '\n')
}

function part2() {
    const res = inputLines.map((line) => {
        const [first, second] = lineSplit(line);

        const overlap = first[1] >= second[0] && second[1] >= first[0];

        return overlap ? 1 : 0;
    });
    log(p2(' Part 2 Answer: '));
    log(t2('The number of assignment pairs that the ranges overlap - ') + res.reduce((a, b) => a + b, 0) + '\n')
}

part1();
part2();