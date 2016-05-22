'use strict'

const _ = require('lodash')
const table = require('text-table')
const chalk = require('chalk')
const figures = require('figures')

module.exports = (flags, branches) => {
    console.log('')

    // No merged or outdated branches? Great work!
    if (branches.length === 0) {
        return console.log(
            chalk.green(figures.tick) +
            ' Your branches look ' + chalk.bold('amazing') + '. Keep up the great work! ' + figures.smiley + '\n'
        )
    }

    // map branches to 'table' output format
    let out = _.map(
        branches,
        item => [
            item.name,
            item.merged ? chalk.bold.white.bgGreen('  ' + figures.tick + '  merged  ') : ' - ',
            item.outdated ? chalk.bold.white.bgRed('  ' + figures.warning + '  outdated  ') : ' - ',
            item.version,
            item.rel
        ]
    )

    // separator below titles
    out.unshift([])

    // titles
    out.unshift([
        chalk.underline('branch'),
        chalk.underline('merged?'),
        chalk.underline('outdated?'),
        chalk.underline('version'),
        chalk.underline('updated')
    ])

    // bottom separator
    out.push([])

    // show table to user
    console.log(table(out, {
        stringLength: s => chalk.stripColor(s).length
    }))
}