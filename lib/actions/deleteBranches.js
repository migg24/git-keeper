'use strict'

const _ = require('lodash')
const execa = require('execa')

module.exports = (answers) => {
    console.log('')

    // do nothing if user did not confirm action
    if (!answers.confirm) {
        return false
    }

    console.log(answers)
}