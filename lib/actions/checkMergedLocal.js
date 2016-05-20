'use strict'

const _ = require('lodash')
const execa = require('execa')
const chalk = require('chalk')
const figures = require('figures')
const ora = require('ora')

module.exports = () => {
    // git branch --merged
    let spin = ora(chalk.dim('Collecting merged local branches')).start()

    return execa('git', ['branch', '--merged']).then((result) => {
        spin.stop()

        let lines = _.reject(
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            item => item.match(/^\*/)
        )

        console.log(
            chalk.green(figures.tick) +
            chalk.dim(' Collected merged local branches')
        )

        return {
            merged: lines
        }
    })
}