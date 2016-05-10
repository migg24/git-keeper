'use strict'

const chalk = require('chalk')

module.exports = function checkMaster(flags, repo) {
    if (!flags.force) {
        return repo.getCurrentBranch().then(reference => {
            if (reference.shorthand() !== 'master') {
                throw new Error(chalk.bold('You are currently not on your master branch but on ' + reference.shorthand() + '.') + '\nThis is not recommended. Use --force to continue anyway.')
            }
        })
    }

    return Promise.resolve()
}