'use strict'

const _ = require('lodash')
const execa = require('execa')
const chalk = require('chalk')
const ora = require('ora')

module.exports = () => {
    // git branch --merged
    let spin = ora(chalk.dim('Collecting merged local branches')).start()

    return execa('git', ['branch', '--merged']).then((result) => {
        spin.stop()

        let lines = _.map(
            _.reject(
                result.stdout.split(/\r?\n/g),
                item => item.match(/^\*/)
            ),
            item => item.trim()
        )

        console.log(
            chalk.green('\u2714') +
            chalk.dim(' Collected merged local branches')
        )

        return {
            local: lines
        }
    })
}