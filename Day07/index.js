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
    let currDir = ['root'];
    const directory = new Map();

    for (const line of input) {
        if (getLineType(line) === 'shell-command') {
            const [temp, command, argument] = line.split(' ');

            if (command === 'cd') {
                if (argument === '/') {
                    currDir.splice(1);
                } else if (argument === '..') {
                    currDir.pop();
                } else {
                    currDir.push(argument);
                }
            }
        }
        if (getLineType(line) === 'file') {
            const [size] = line.split(' ');
            const key = currDir.join('/');

            directory.set(key, (directory.get(key) || 0) + Number(size));

            if (currDir.length > 1) {
                for (let i = currDir.length - 1; i > 0; i--) {
                    const mainKey = currDir.slice(0, i).join('/');

                    directory.set(mainKey, (directory.get(mainKey) || 0) + Number(size));
                }
            }
        }
    }
    return directory;
}

function part1() {
    const MAX_DIR_SIZE = 100000;
    const dirSize = getDirSize();
    let totalSize = 0;

    for(const size of dirSize.values()) {
        if(size <= MAX_DIR_SIZE) totalSize += size;
    }

    log(p1(' Part 1 Answer: '));
    log(t1("The Sum of of the total sizes of the directories of at most 100000 - ") + totalSize + "\n");
}

function part2() {
    const TOTAL_SIZE = 70000000,
        NEEDED_SPACE = 30000000;

    const dirSize = getDirSize();
    
    const USED_SPACE = dirSize.get('root');
    const REQ_SPACE = NEEDED_SPACE - (TOTAL_SIZE - USED_SPACE)
    
    let smallestReq = Infinity;

    for (let size of dirSize.values()) {
        if (size >= REQ_SPACE && size < smallestReq) {
            smallestReq = size;
        }
    }

    log(p2(' Part 2 Answer: '));
    log(t2("The size of the Smallest directory that needs to be deleted - ") + smallestReq + "\n");
}

part1();
part2();