'use strict'

const checkMaster = require('./actions/checkMaster')

module.exports = function (flags, repo) {
    return checkMaster(flags, repo).then(() => {

    })
}