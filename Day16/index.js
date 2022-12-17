import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url).replace(/\r/g, "").trim();
const p1 = chalk.bgMagenta,
    p2 = chalk.bgGreen,
    t1 = chalk.magenta,
    t2 = chalk.green;

const dataFrmInput = input
    .split('\n')
    .map((item) => item.split(' '));

const reportMap = new Map();
dataFrmInput.forEach((item) => {
    reportMap.set(item[1], {
        rate: +(item[4].split('=')[1].slice(0, -1)),
        leadsTo: item.splice(9).map(i => i.substring(0, 2)),
        shrtstDist: new Map()
    });
});

console.log(reportMap);

function part1() {
    for (let key of reportMap.keys()) {
        let visitedNode = new Set();
        let q = [[key, 0]];

        while (q.length) {
            let currNode = q.shift();
            if (visitedNode.has(currNode[0])) {
                continue;
            }

            visitedNode.add(currNode[0]);
            reportMap.get(key).shrtstDist.set(currNode[0], currNode[1]);

            reportMap.get(currNode[0]).leadsTo.forEach((leads) => q.push([leads, currNode[1] + 1]));
        }
    }
    console.log(reportMap);

    let rootState = { valve: 'AA', time: 30, pressure: 0, opened: new Set() };
    let que = [rootState];
    let maxPressure = 0;

    while (que.length) {
        let currNode = que.pop();
        if (currNode.time == 0) {
            continue;
        }
        for (let key of reportMap.keys()) {
            if (!currNode.opened.has(key) && key != currNode.valve && reportMap.get(key).rate != 0) {
                let dist = reportMap.get(currNode.valve).shrtstDist.get(key);
                let time = currNode.time - dist - 1;
                let newPressure = currNode.pressure + reportMap.get(key).rate * time;

                if (time >= 0) {
                    let newOpened = new Set(currNode.opened);
                    newOpened.add(key);
                    que.push({ valve: key, time: time, pressure: newPressure, opened: newOpened });
                    maxPressure = Math.max(maxPressure, newPressure);
                }
            }
        }
    }
    console.log(maxPressure);
}

part1();