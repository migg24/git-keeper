'use strict'

const _ = require('lodash')
const table = require('text-table')
const chalk = require('chalk')
const figures = require('figures')

module.exports = (branches) => {
    console.log('')

    if (branches.length === 0) {
        return console.log(
            chalk.green(figures.tick) +
            ' Your branches look ' + chalk.bold('amazing') + '. Keep up the great work! ' + figures.smiley + '\n'
        )
    }

    let info = _.map(
        branches,
        item => [
            item.name,
            item.merged ? chalk.bold.white.bgGreen('  ' + figures.tick + '  merged  ') : ' - ',
            item.outdated ? chalk.bold.white.bgRed('  ' + figures.warning + '  outdated  ') : ' - ',
            item.rel
        ]
    )

    let out = [
        [
            chalk.underline('branch'),
            chalk.underline('merged?'),
            chalk.underline('outdated?'),
            chalk.underline('updated')
        ],
        [ ' ', ' ', ' ', ' ' ]
    ]

    _.forEach(info, (item) => {
        out.push(item)
        out.push([' ', ' ', ' ', ' '])
    })

    console.log(table(out, {
        stringLength: s => chalk.stripColor(s).length
    }))
}