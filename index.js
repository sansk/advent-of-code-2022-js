import { execSync } from 'child_process';
import chalk from 'chalk';

const arg = process.argv[2] || '00'; // Default value `00` if no args provided via CLI.
console.log(chalk.bgBlue("Executing Day" + arg + "..."));
console.log(chalk.blue("******************"));
execSync('node ./Day' + arg + '/index.js', { stdio: [0, 1, 2] });