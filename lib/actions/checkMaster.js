'use strict'

const execa = require('execa')
const chalk = require('chalk')
const figures = require('figures')
const ora = require('ora')

module.exports = (flags) => {
    if (flags.force) {
        console.log(
            chalk.green(figures.tick) +
            chalk.dim(' Skipped checking for branch "master" (--force)')
        )

        return Promise.resolve()
    }

    let spin = ora(chalk.dim('Checking master')).start()

    // git status -sbz
    return execa('git', ['status', '-sbz']).then(result => {
        spin.stop()

        let match = String(result.stdout).match(/^## (.+?)\.\.\.(.+)$/)

        if (!match) {
            throw new Error(
                chalk.red(figures.warning) +
                chalk.bold(' Error fetching git branch info.')
            )
        } else if (match[1] !== 'master') {
            throw new Error(
                chalk.red(figures.warning) +
                chalk.bold(' You are currently not on branch "master" but on "' + match[1] + '".') +
                '\n  This is not recommended. Use --force to continue anyway.'
            )
        }

        console.log(
            chalk.green(figures.tick) +
            chalk.dim(' You are on branch "master"')
        )

        return {
            current: match[1],
            remote: match[2] ? match[2].trim().replace(/\0/g, '') : ''
        }
    })
}