import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url);
const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const [rawStacks, rawMoves] = input.replace(/\r/g, "")
    .trimEnd()
    .split("\n\n")
    .map((x) => x.split("\n"));

const parsedStacks = rawStacks.map((line) =>
    [...line].filter((value, index) => index % 4 === 1)
);

const indexes = parsedStacks.pop();

const stacks = {};

for (const line of parsedStacks) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== " ") {
            if (!stacks[indexes[i]]) {
                stacks[indexes[i]] = [];
            }
            stacks[indexes[i]].unshift(line[i]);
        }
    }
}

const moves = [];
for (const move of rawMoves) {
    const match = /move (\d+) from (\d+) to (\d+)/g.exec(move);
    moves.push({
        count: parseInt(match[1]),
        from: parseInt(match[2]),
        to: parseInt(match[3]),
    });
}

function part1() {
    const localStacks = JSON.parse(JSON.stringify(stacks));
    for (const move of moves) {
        for (let i = 0; i < move.count; i++) {
            const crate = localStacks[move.from].pop();
            localStacks[move.to].push(crate);
        }
    }
    const res = indexes
        .map((value) => {
            const stack = localStacks[value];
            return stack[stack.length - 1];
        })
        .join("");
    log(p1(' Part 1 Answer: '));
    log(t1('The crate on top of the stack  - ') + res + '\n');
}


function part2() {
    const localStacks = JSON.parse(JSON.stringify(stacks));
    for (const move of moves) {
        const crates = localStacks[move.from].splice(-move.count, move.count);
        localStacks[move.to] = localStacks[move.to].concat(crates);
    }
    const res = indexes
        .map((value) => {
            const stack = localStacks[value];
            return stack[stack.length - 1];
        })
        .join("");
    log(p2(' Part 2 Answer: '));
    log(t2('The crate on top of the stack - ') + res + '\n');
}

part1();
part2();