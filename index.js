import { execSync } from 'child_process';

const arg = process.argv[2] || '00'; // Default value `00` if no args provided via CLI.

execSync('node ./Day' + arg + '/index.js', { stdio: [0, 1, 2] });