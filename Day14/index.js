import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const input = getInput(import.meta.url).replace(/\r/g, "").trim().split('\n');

const getWalls = () => {
    return (input.reduce((set, line) => {
        let points = line.split(' -> ').map(element => element.split(',').map(num => parseInt(num)));

        for (let i = 1; i < points.length; i++) {
            let minX = Math.min(points[i - 1][0], points[i][0]);
            let maxX = Math.max(points[i - 1][0], points[i][0]);
            let minY = Math.min(points[i - 1][1], points[i][1]);
            let maxY = Math.max(points[i - 1][1], points[i][1]);
            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    set.add(`${x},${y}`);
                }
            }
        }
        return set;
    }, new Set()));
}

function part1() {
    let walls = getWalls();

    let currentSand = { x: 500, y: 0 };
    let bitsOfSand = 0;
    let finished = false;
    let lowest = [...walls].reduce((highest, point) => Math.max(parseInt(point.split(',')[1]), highest), -Infinity);
    while (!finished) {
        while (!finished) {
            if (walls.has(`${currentSand.x},${currentSand.y + 1}`)) {
                if (!walls.has(`${currentSand.x - 1},${currentSand.y + 1}`)) {
                    currentSand.x--;
                    currentSand.y++;
                } else if (!walls.has(`${currentSand.x + 1},${currentSand.y + 1}`)) {
                    currentSand.x++;
                    currentSand.y++;
                } else {
                    walls.add(`${currentSand.x},${currentSand.y}`);
                    break;
                }
            } else {
                currentSand.y++;
            }

            if (currentSand.y > lowest) finished = true;
        }
        currentSand = { x: 500, y: 0 };
        bitsOfSand++;
    }
    log(p1(' Part 1 Answer: '));
    log(t1("The units of sand that comes to rest before and starts flowing into the abyss below - ") + (bitsOfSand - 1) + "\n");
}

function part2() {
    let walls = getWalls();

    let currentSand = { x: 500, y: 0 };
    let bitsOfSand = 0;
    let lowest = [...walls].reduce((highest, point) => Math.max(parseInt(point.split(',')[1]), highest), -Infinity);
    while (!walls.has('500,0')) {
        while (true) {
            if (walls.has(`${currentSand.x},${currentSand.y + 1}`)) {
                if (!walls.has(`${currentSand.x - 1},${currentSand.y + 1}`)) {
                    currentSand.x--;
                    currentSand.y++;
                } else if (!walls.has(`${currentSand.x + 1},${currentSand.y + 1}`)) {
                    currentSand.x++;
                    currentSand.y++;
                } else {
                    walls.add(`${currentSand.x},${currentSand.y}`);
                    break;
                }
            } else {
                currentSand.y++;
            }

            if (currentSand.y == lowest + 1) {
                walls.add(`${currentSand.x},${currentSand.y}`);
                break;
            }
        }
        currentSand = { x: 500, y: 0 };
        bitsOfSand++;
    }
    log(p2(' Part 2 Answer: '));
    log(t2("The units of sand that comes to rest - ") + bitsOfSand + "\n");
}

part1();
part2();