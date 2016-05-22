'use strict'

const _ = require('lodash')
const execa = require('execa')

module.exports = () => {
    return execa('git', ['branch', '--merged']).then((result) => {
        // collect branches from result.stdout
        let lines = _.reject(
            // split and trim output
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            // leave out current branch
            item => item.match(/^\*/)
        )

        return {
            merged: lines
        }
    })
}