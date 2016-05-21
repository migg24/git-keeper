'use strict'

const _ = require('lodash')
const inquirer = require('inquirer')
const table = require('text-table')
const chalk = require('chalk')
const figures = require('figures')

function unselectable(title) {
    return new inquirer.Separator(chalk.reset(title ? title : ' '))
}

function tableize(choices) {
    let labels = table(_.map(choices, 'name'), {
        stringLength: s => chalk.stripColor(s).length
    }).split('\n')

    return _.map(choices, (choice, i) => {
        if (!choice.value) {
            return unselectable('  ' + labels[i])
        }

        choice.name = labels[i]
        return choice
    })
}

function deleteSelected(answers) {
    console.log('')
    console.log(answers)
}

module.exports = (branches) => {
    console.log('')

    if (branches.length === 0) {
        return console.log(
            chalk.green(figures.tick) +
            ' Your branches look ' + chalk.bold('amazing') + '. Keep up the great work! ' + figures.smiley + '\n'
        )
    }

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

    choices.unshift(unselectable())
    choices.push(unselectable())
    choices.push(unselectable('Space to select. Enter to delete selected branches. Control-C to cancel.'))
    choices.push(unselectable())
    choices.push(unselectable(chalk.red.bold(figures.warning + '  Be VERY careful! Enter deletes selected branches without confirmation!')))

    inquirer.prompt({
        name: 'branches',
        message: 'Choose which branches to delete.',
        type: 'checkbox',
        choices: choices,
        pageSize: process.stdout.rows - 2
    }).then(deleteSelected)
}