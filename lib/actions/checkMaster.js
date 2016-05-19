'use strict'

const chalk = require('chalk')
const execa = require('execa')

module.exports = function checkMaster(flags) {
    if (flags.force) {
        return Promise.resolve()
    }

    // git status -bz
    return execa('git', ['status', '-bz']).then(result => {
        let match = String(result.stdout).match(/^## ([^.]+)/)

        if (!match) {
            throw new Error(chalk.bold('Error fetching git branch info.'))
        } else if (match[1] !== 'master') {
            throw new Error(chalk.bold('You are currently not on your master branch but on ' + match[1] + '.') + '\nThis is not recommended. Use --force to continue anyway.')
        }
    })
}