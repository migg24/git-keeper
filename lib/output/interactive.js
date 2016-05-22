'use strict'

const _ = require('lodash')
const inquirer = require('inquirer')
const table = require('text-table')
const chalk = require('chalk')
const figures = require('figures')
const deleteBranches = require('../actions/deleteBranches')

/**
 * Generate unselectable inquirer option with given title
 *
 * @param {string} title
 * @returns {inquirer.Separator}
 */
function unselectable(title) {
    return new inquirer.Separator(chalk.reset(title ? title : ' '))
}

/**
 * Returns an array containing the given choices with their names
 * reformatted as a table for displaying.
 *
 * @param {Array} choices
 * @returns {Array}
 */
function tableize(choices) {
    // generate table from choice names and split output into array
    let labels = table(_.map(choices, 'name'), {
        stringLength: s => chalk.stripColor(s).length
    }).split('\n')

    // substitute choice names with table formatted names
    return _.map(choices, (choice, i) => {
        if (!choice.value) {
            return unselectable('  ' + labels[i])
        }

        choice.name = labels[i]
        return choice
    })
}

module.exports = (flags, branches) => {
    console.log('')

    // No merged or outdated branches? Great work!
    if (branches.length === 0) {
        return console.log(
            chalk.green(figures.tick) +
            ' Your branches look ' + chalk.bold('amazing') + '. Keep up the great work! ' + figures.smiley + '\n'
        )
    }

    // map branches to inquirer choice objects
    let choices = _.map(
        branches,
        item => ({
            name: [
                ' ' + item.name,
                item.merged ? chalk.bold.white.bgGreen('  ' + figures.tick + '  merged  ') : ' - ',
                item.outdated ? chalk.bold.white.bgRed('  ' + figures.warning + '  outdated  ') : ' - ',
                item.rel
            ],
            value: item.name,
            short: item.name
        })
    )

    // separator below titles
    choices.unshift({
        name: []
    })

    // titles
    choices.unshift({
        name: [
            ' ' + chalk.underline('branch'),
            chalk.underline('merged?'),
            chalk.underline('outdated?'),
            chalk.underline('updated')
        ]
    })

    // tableized choices
    choices = tableize(choices)

    // footer
    choices.unshift(unselectable())
    choices.push(unselectable())
    choices.push(unselectable('Space to select. Enter to delete selected branches. Control-C to cancel.'))

    // prompt the user
    inquirer.prompt([
        {
            name: 'branches',
            message: 'Choose which branches to delete.',
            type: 'checkbox',
            choices: choices,
            pageSize: process.stdout.rows - 2
        },
        {
            name: 'confirm',
            message: chalk.red('Are you sure you want to delete the selected branches?'),
            type: 'confirm'
        }
    ]).then(deleteBranches)
}