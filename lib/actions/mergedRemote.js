'use strict'

const _ = require('lodash')
const execa = require('execa')
// const chalk = require('chalk')
// const figures = require('figures')
// const ora = require('ora')

module.exports = (flags, remote) => {
    //let spin = ora(chalk.dim('Collecting merged branches')).start()

    return execa('git', ['branch', '-r', '--merged']).then((result) => {
        //spin.stop()

        let lines = _.reject(
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            item => {
                return item === remote
            }
        )

        // console.log(
        //     chalk.green(figures.tick) +
        //     chalk.dim(' Collected merged branches')
        // )

        return {
            merged: lines
        }
    })
}