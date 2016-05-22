'use strict'

const _ = require('lodash')
const execa = require('execa')

module.exports = (flags, status) => {
    return execa('git', ['branch', '-r', '--merged']).then((result) => {
        // collect branches from result.stdout
        let lines = _.reject(
            // split and trim output
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            // leave out remote that matches current branch remote
            item => {
                return item === status.remote
            }
        )

        return {
            merged: lines
        }
    })
}