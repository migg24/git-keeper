'use strict'

const _ = require('lodash')
const execa = require('execa')

module.exports = (answers) => {
    console.log('')

    if (!answers.confirm) {
        return false
    }

    console.log(answers)
}