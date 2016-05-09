'use strict'

const checkMaster = require('./actions/checkMaster')

module.exports = function (flags, repo) {
    return checkMaster(repo).then(() => {

    })
}