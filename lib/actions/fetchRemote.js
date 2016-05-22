'use strict'

const execa = require('execa')
const chalk = require('chalk')
const figures = require('figures')
const ora = require('ora')

module.exports = function fetchRemote(flags) {
    // git fetch
    let args = ['fetch']

    // fetch with prune?
    if (!flags.skipPrune) {
        // git fetch -p
        args.push('-p')
    }

    let spin = ora(chalk.dim('Fetching remote')).start()

    return execa('git', args).then(() => {
        spin.stop()

        console.log(
            chalk.green(figures.tick) +
            chalk.dim(' Fetched remote')
        )
    })
}