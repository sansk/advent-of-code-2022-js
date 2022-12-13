import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url).replace(/\r/g, "").trim();
const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const packetData = input
    .split('\n\n')
    .map((pairPacket) => pairPacket.split('\n').map(JSON.parse));

const comparePair = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') return a - b;

    if (typeof a === 'number') {
        a = [a];
    } else if (typeof b === 'number') {
        b = [b];
    }

    for (let i = 0; i < a.length; i++) {
        if (b[i] === undefined) {
            return 1;
        }
        const c = comparePair(a[i], b[i]);
        if (c !== 0) {
            return c;
        }
    }

    return a.length === b.length ? 0 : -1;
}

function part1() {
    const correctPair = packetData.map(([a, b], i) => {
        return +(comparePair(a, b) <= 0) * (i + 1);
    });
    log(p1(' Part 1 Answer: '));
    log(t1("The Sum of the indicies of the correct order pair - ") + correctPair.reduce((acc, currVal) => acc + currVal) + "\n");
}

function part2() {
    const dividerPackets = [[[2]], [[6]]];
    const packets = packetData
        .flat()
        .concat(dividerPackets)
        .sort(comparePair);
    
    const res = dividerPackets.map((d) => packets.indexOf(d) + 1).reduce((acc, n) => acc * n)
    log(p2(' Part 2 Answer: '));
    log(t2("The Decoder Key for the distress Signal - ") + res + "\n");
}


part1();
part2();