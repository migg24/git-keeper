'use strict'

const _ = require('lodash')
const execa = require('execa')

module.exports = () => {
    return execa('git', ['branch', '--merged']).then((result) => {
        let lines = _.reject(
            _.map(
                result.stdout.split(/\r?\n/g),
                item => item.trim()
            ),
            item => item.match(/^\*/)
        )

        return {
            merged: lines
        }
    })
}