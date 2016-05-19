'use strict'

const execa = require('execa')
const chalk = require('chalk')
const ora = require('ora')

module.exports = function fetchRemote(flags) {
    // git fetch -p
    let args = ['fetch']

    if (!flags.skipPrune) {
        args.push('-p')
    }

    let spin = ora(chalk.dim('Fetching remote')).start()

    return execa('git', args).then(() => {
        spin.stop()

        console.log(
            chalk.green('\u2714') +
            chalk.dim(' Fetched remote')
        )
    })
}