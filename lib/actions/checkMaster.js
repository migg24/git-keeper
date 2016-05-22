'use strict'

const execa = require('execa')
const chalk = require('chalk')
const figures = require('figures')

module.exports = (flags) => {
    return execa('git', ['status', '-sb']).then(result => {
        // match current branch with remote if exists
        let match = String(result.stdout).match(/^## (\S+)/)

        // no match -> something went wrong
        if (!match) {
            throw new Error(
                chalk.red(figures.warning) +
                chalk.red.bold(' Error fetching git branch info.')
            )
        }

        match = match[1].split('...')

        if (flags.force && match[0] !== 'master') {
            // Continue with --force if not on master
            console.log(
                chalk.red(figures.cross +' Continuing with branch "' + match[0] + '" (--force)')
            )
        } else {
            // No --force and not on master? -> error message
            if (match[0] !== 'master') {
                throw new Error(
                    chalk.red(figures.warning) +
                    chalk.red.bold(
                        ' You are currently not on branch "master" but on "' + match[0] + '". This is not recommended!')
                    + '\n  Use --force to continue anyway.'
                )
            }

            console.log(
                chalk.green(figures.tick) +
                chalk.dim(' You are on branch "master"')
            )
        }

        // return current branch name and remote name
        return {
            current: match[0],
            remote: match[1] ? match[1].trim().replace(/\0/g, '') : ''
        }
    })
}