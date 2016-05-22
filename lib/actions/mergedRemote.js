'use strict'

const _ = require('lodash')
const execa = require('execa')

module.exports = (flags, status) => {
    return execa('git', ['branch', '-r', '--merged']).then((result) => {
        let lines = _.reject(
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            item => {
                return item === status.remote
            }
        )

        return {
            merged: lines
        }
    })
}