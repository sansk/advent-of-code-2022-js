import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url).replace(/\r/g, "").trim();
const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

function isUniqueArray(arr) {
    return new Set(arr).size === arr.length;
}

function part1() {
    let msgStream = [];
    for (let i = 0; i < input.length; i++) {
        msgStream.push(input[i]);
        if (msgStream.length > 4) {
            msgStream.shift();
        }
        if (msgStream.length === 4 && isUniqueArray(msgStream)) {
            log(p1(' Part 1 Answer: '));
            log(t1('No. of characters processed before the first start-of-packet marker is detected - ') + (i + 1) + '\n');
            break;
        }
    }
}

function part2() {
    const msgLength = 14;
    let msgStream = [];
    for (let i = 0; i < input.length; i++) {
        msgStream.push(input[i]);
        if (msgStream.length > msgLength) {
            msgStream.shift();
        }
        if (msgStream.length === msgLength && isUniqueArray(msgStream)) {
            log(p2(' Part 1 Answer: '));
            log(t2('No. of characters processed before the first start-of-packet marker is detected - ') + (i + 1) + '\n');
            break;
        }
    }
}

part1();
part2();