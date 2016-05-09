'use strict'

let program = require('commander')

program
    .version('0.1.0')
    .option('-i, --interactive', 'Interactive mode')
    .option('-s, --skip-prune', 'Skip pruning remote branches')
    .option('-d, --days <n>', 'Set days until a branch is outdated', 30)
    .parse(process.argv)

console.log()