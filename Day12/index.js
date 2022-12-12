import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url);
const p1 = chalk.bgMagenta;
const p2 = chalk.bgGreen;

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
const start = [];
let end;

const getHeightMap = (isPartTwo) => {
    return input.split('\n').map((line, i) =>
        line.split('').map((char, j) => {
            let elevation;
            if (char === 'S' || (isPartTwo && char === 'a')) {
                elevation = 0;
                start.push([i, j]);
            } else if (char === 'E') {
                elevation = 25;
                end = [i, j];
            } else {
                elevation = char.codePointAt(0) - 'a'.codePointAt(0);
            }
            return elevation;
        }));
}

const queueMap = (heightMap) => {
    const queue = start.map((strt) => ({ pos: strt, steps: 0 }));
    const seen = [];
    
    while (queue[0].pos[0] !== end[0] || queue[0].pos[1] !== end[1]) {
        const {
            pos: [i, j],
            steps,
        } = queue.shift();
        if (seen[i]?.[j]) {
            continue;
        }
        for (const [di, dj] of directions) {
            if (
                heightMap[i + di]?.[j + dj] === undefined ||
                heightMap[i + di][j + dj] > heightMap[i][j] + 1 ||
                seen[i + di]?.[j + dj]
            ) {
                continue;
            }
            queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
        }
        seen[i] = seen[i] ?? [];
        seen[i][j] = 1;
    }
    return queue[0].steps;
}

function part1() {
    const heightMap = getHeightMap(false);
    const res = queueMap(heightMap);
    log(p1(' Part 1 Answer: '));
    log(chalk.magenta("The fewest number of steps required to move from the current position to the location that should get the best signal - ") + res + "\n");
}

function part2() {
    const heightMap = getHeightMap(true);
    const res = queueMap(heightMap);
    log(p2(' Part 2 Answer: '));
    log(chalk.green("The fewest number of steps required to move starting from any square with elevation 'a' to the location that should get the best signal - ") + res + "\n");
}

part1();
part2();