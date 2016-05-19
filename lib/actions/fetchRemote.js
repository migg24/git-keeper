'use strict'

const execa = require('execa')

module.exports = function fetchRemote(flags) {
    // git fetch -p
    let args = ['fetch']

    if (!flags.skipPrune) {
        args.push('-p')
    }

    return execa('git', args)
}