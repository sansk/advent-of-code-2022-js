import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const input = getInput(import.meta.url).replace(/\r/g, "").trim().split('\n');