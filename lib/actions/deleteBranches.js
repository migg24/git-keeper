'use strict'

const _ = require('lodash')
const chalk = require('chalk')
const figures = require('figures')
const execa = require('execa')
const ora = require('ora')

function deleteLocal(flags, answers) {
    // git branch -D name1 name2 name3 ...
    return execa('git', ['branch', '-D'].concat(answers.branches)).then(result => {
        if (result.stderr) {
            console.log(chalk.red(result.stderr))
        }

        let lines = _.map(
            result.stdout.split(/\r?\n/g),
            item => ({
                raw: item.trim(),
                restore: item.trim().match(/^Deleted branch (.+?) \(was (\w+)\).$/)
            })
        )

        // log output
        _.forEach(lines, line => console.log(
            line.raw +
            (line.restore ? ' Restore: ' + chalk.inverse('git branch ' + line.restore[1] + ' ' + line.restore[2]) : '')
        ))

        console.log('')
    })
}

function deleteRemote(flags, answers) {
    // git push origin :name1, git push origin :name2, ...
    // git 1.7.0+: git push origin --delete name1 name2 name3 ...
    let spin = ora(
        chalk.dim('Deleting remote branch' + (answers.branches.length === 1 ? '' : 'es') + ' ' + answers.branches.join(', '))
    ).start()

    let actions = _.map(
        answers.branches,
        branch => {
            let tmp = branch.match(/^(\w+)\/(.+)$/)

            return execa('git', ['push', tmp[1], ':' + tmp[2]])
        }
    )

    let log = results => {
        spin.stop()

        let lines = _.map(
            results,
            result => result.stderr ? result.stderr : result.stdout
        )

        _.forEach(lines, line => console.log(line))

        console.log('')
    }

    return Promise.all(actions).then(log).catch(log)
}

module.exports = _.curry((flags, answers) => {
    console.log('')

    // do nothing if user did not confirm action
    if (!answers.confirm) {
        return false
    }

    let del = flags.remote ? deleteRemote : deleteLocal

    return del(flags, answers)
})