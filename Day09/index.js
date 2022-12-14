import { readFileSync } from "node:fs";
import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url).replace(/\r/g, "").trim().split("\n")

const lines = input.map((line) => {
    const [letter, number] = line.split(" ");
    return {
        direction: letter,
        totalMoves: parseInt(number),
    };
});

const movesDefinition = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 }
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(direction) {
        const delta = movesDefinition[direction];
        this.x += delta.x;
        this.y += delta.y;
    }
    follow(point) {
        const distance = Math.max(
            Math.abs(this.x - point.x),
            Math.abs(this.y - point.y)
        );
        if (distance > 1) {
            const directionX = point.x - this.x;
            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
            const directionY = point.y - this.y;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }
}

const markVisited = (x, y, visited) => {
    visited.add(`${x}-${y}`);
}

function part1() {
    const head = new Point(0, 0);
    const tail = new Point(0, 0);
    const visited = new Set();
    markVisited(0, 0, visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
            head.move(line.direction);
            tail.follow(head);
            markVisited(tail.x, tail.y, visited);
        }
    }

    console.log(visited.size);
}

function part2() {
    const knots = new Array(10).fill(0).map((_) => new Point(0, 0));
    const visited = new Set();
    markVisited(0, 0, visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
            knots[0].move(line.direction);
            for (let knot = 1; knot < knots.length; knot++) {
                const point = knots[knot];
                point.follow(knots[knot - 1]);
            }
            const tail = knots[knots.length - 1];
            markVisited(tail.x, tail.y, visited);
        }
    }

    console.log(visited.size);
}

part1();
part2();