'use strict'

const _ = require('lodash')
const execa = require('execa')
const chalk = require('chalk')
const figures = require('figures')
const ora = require('ora')
const moment = require('moment')

module.exports = (flags, status, data) => {
    let spin = ora(chalk.dim('Collecting outdated branches')).start()

    return execa('git',
        [
            'for-each-ref',
            flags.remote ? 'refs/remotes/' : 'refs/heads/',
            '--format=%(refname:short)~~%(committerdate:iso8601)~~%(committerdate:relative)'
        ]
    ).then((result) => {
        spin.stop()

        let branches = _.map(
            result.stdout.split(/\r?\n/g),
            item => {
                // ~ is illegal in branch names: http://stackoverflow.com/a/3651867/387573
                let tmp = item.trim().split('~~')

                return {
                    name: tmp[0],
                    rel: tmp[2],
                    outdated: moment(tmp[1]).add(flags.days, 'days').isBefore(moment()),
                    merged: data.merged.indexOf(tmp[0]) !== -1
                }
            }
        )

        branches = _.filter(
            branches,
            item => item.name !== status.current && (item.merged || item.outdated)
        )

        console.log(
            chalk.green(figures.tick) +
            chalk.dim(' Collected outdated local branches')
        )

        return branches
    })
}