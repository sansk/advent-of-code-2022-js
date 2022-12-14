import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const stmnt = getInput(import.meta.url).replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((line) => {
        const input = line.split(" ");
        const s = {};
        s.op = input[0];
        if (s.op === "addx") {
            s.value = parseInt(input[1]);
        }
        return s;
    });

class CPU {
    constructor(stmnt) {
        this.stmnt = stmnt;
        this.currentLine = 0;
        this.cycle = 1;
        this.wait = 0;
        this.registers = {
            X: 1,
        };
    }

    runCycle() {
        if (this.currentLine >= this.stmnt.length) {
            return false;
        }
        this.cycle++;

        const line = this.stmnt[this.currentLine];

        switch (line.op) {
            case "noop":
                this.currentLine++;
                break;
            case "addx":
                if (this.wait === 0) {
                    this.wait = 1;
                } else {
                    this.wait--;
                    if (this.wait === 0) {
                        this.registers.X += line.value;
                        this.currentLine++;
                    }
                }
                break;
            default:
                throw new Error("unkown op: " + line.op);
        }

        return true;
    }
}

function part1() {
    const cpu = new CPU(stmnt);
    let sum = 0;
    while (true) {
        if (!cpu.runCycle()) {
            break;
        }
        if (cpu.cycle % 40 === 20) {
            sum += cpu.cycle * cpu.registers.X;
        }
    }
    log(p1(' Part 1 Answer: '));
    log(t1("The Sum of the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles - ") + sum + "\n");
}

class CRT {
    constructor(width = 40, height = 6) {
        this.width = width;
        this.height = height;
        this.currentIndex = 0;

        this.content = new Array(this.height)
            .fill(0)
            .map((_) => new Array(this.width).fill(" "));
    }

    runCycle(spritePosition) {
        const x = this.currentIndex % this.width;
        const y = Math.floor(this.currentIndex / this.width);

        if (y >= this.height) {
            return;
        }

        if (Math.abs(x - spritePosition) < 2) {
            this.content[y][x] = "#";
        } else {
            this.content[y][x] = ".";
        }

        this.currentIndex++;
    }

    printScreen() {
        console.log(this.content.map((line) => line.join("")).join("\n"));
    }
}

function part2() {
    const cpu = new CPU(stmnt);
    const crt = new CRT();
    while (true) {
        crt.runCycle(cpu.registers.X);
        if (!cpu.runCycle()) {
            break;
        }
    }
    log(p2(' Part 2 Answer: '));
    log(t2("The 8 letters in CRT - \n"));
    crt.printScreen();
}

part1();
part2();