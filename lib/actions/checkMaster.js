'use strict'

const execa = require('execa')
const chalk = require('chalk')
const ora = require('ora')

module.exports = (flags) => {
    if (flags.force) {
        console.log(
            chalk.green('\u2714') +
            chalk.dim(' Skipped checking for branch "master" (--force)')
        )

        return Promise.resolve()
    }

    let spin = ora(chalk.dim('Checking master')).start()

    // git status -bz
    return execa('git', ['status', '-bz']).then(result => {
        spin.stop()

        let match = String(result.stdout).match(/^## ([^.]+)/)

        if (!match) {
            throw new Error(
                chalk.red('\u2716') +
                chalk.bold(' Error fetching git branch info.')
            )
        } else if (match[1] !== 'master') {
            throw new Error(
                chalk.red('\u2716') +
                chalk.bold(' You are currently not on branch "master" but on "' + match[1] + '".') +
                '\n  This is not recommended. Use --force to continue anyway.'
            )
        }

        console.log(
            chalk.green('\u2714') +
            chalk.dim(' You are on branch "master"')
        )
    })
}