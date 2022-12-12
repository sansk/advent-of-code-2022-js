import { getInput, log } from '../utils/index.js';
import chalk from 'chalk';

const input = getInput(import.meta.url);
const p1 = chalk.bgMagenta;
const p2 = chalk.bgGreen;

const getOperationFunction = (input) => {
    return function (old) {
        const string = input.replace(/old/, old);
        return eval(string);
    };
}

const getMonkeys = () => {
    const monkeys = input.replace(/\r/g, "")
        .trim()
        .split("\n\n")
        .map((lines, monkeyId) => {
            const items = lines
                .match(/Starting items(?:[:,] (\d+))+/g)[0]
                .split(": ")[1]
                .split(", ")
                .map(Number);
            const operation = lines.match(/= ([^\n]+)/)[1];

            const divisibleBy = parseInt(lines.match(/divisible by (\d+)/)[1]);
            const whenTrueSendTo = parseInt(
                lines.match(/If true: throw to monkey (\d)/)[1]
            );
            const whenFalseSendTo = parseInt(
                lines.match(/If false: throw to monkey (\d)/)[1]
            );

            return {
                id: monkeyId,
                totalInspectedObjects: 0,
                items,
                divisibleBy,
                operation: getOperationFunction(operation),
                sendTo: (item) =>
                    item % divisibleBy === 0 ? whenTrueSendTo : whenFalseSendTo,
            };
        });
    return monkeys;
}

function part1() {
    const monkeys = getMonkeys();
    for (let i = 0; i < 20; i++) {
        for (const monkey of monkeys) {
            let items = monkey.items;
            while (items.length) {
                let item = items.shift();
                monkey.totalInspectedObjects++;

                item = monkey.operation(item);
                item = Math.floor(item / 3);
                const destination = monkey.sendTo(item);

                monkeys[destination].items.push(item);
            }
        }
    }
    const activity = monkeys.map((m) => m.totalInspectedObjects);
    activity.sort((a, b) => b - a);
    log(p1(' Part 1 Answer: '));
    log(chalk.magenta("The level of monkey business after 20 rounds of stuff-slinging simian shenanigans - ") + activity[0] * activity[1] + "\n");
}

function part2() {
    const monkeys = getMonkeys();
    const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);
    for (let i = 0; i < 10000; i++) {
        for (const monkey of monkeys) {
            let items = monkey.items;
            while (items.length) {
                let item = items.shift();
                monkey.totalInspectedObjects++;

                item = monkey.operation(item);
                item = item % divider;
                const destination = monkey.sendTo(item);

                monkeys[destination].items.push(item);
            }
        }
    }
    const activity = monkeys.map((m) => m.totalInspectedObjects);
    activity.sort((a, b) => b - a);
    log(p2(' Part 2 Answer: '));
    log(chalk.green("The level of monkey business after 10000 rounds - ") + activity[0] * activity[1] + "\n");
}

part1();
part2();