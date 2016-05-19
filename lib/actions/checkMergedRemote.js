'use strict'

const _ = require('lodash')
const execa = require('execa')
const chalk = require('chalk')
const ora = require('ora')

module.exports = (flags, remote) => {
    // git branch --merged
    let spin = ora(chalk.dim('Collecting merged remote branches')).start()

    return execa('git', ['branch', '-r', '--merged']).then((result) => {
        spin.stop()

        let lines = _.reject(
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            item => {
                return item === remote
            }
        )

        console.log(
            chalk.green('\u2714') +
            chalk.dim(' Collected merged remote branches')
        )

        return {
            merged: lines
        }
    })
}