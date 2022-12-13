import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url)
    .replace(/\r/g, "")
    .trim()
    .split("\n");

const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const getLineType = (i) => {
    if (i.startsWith("$")) return 'shell-command';
    if (i.startsWith("dir")) return 'directory';
    return 'file'
}

const getDirSize = () => {
    let currDir = ['/'];

    for(const line of input) {
        if (getLineType(line) === 'shell-command') {
            const [temp, command, argument] = line.split(' ');
            console.log(line);
            console.log(t2(command));
            console.log(t1(argument));
        }
    }
}

function part1() {
    const MAX_DIR_SIZE = 100000; 
    getDirSize();

}    

part1();