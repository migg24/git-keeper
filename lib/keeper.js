'use strict'

const checkMaster = require('./actions/checkMaster')
const fetchRemote = require('./actions/fetchRemote')

module.exports = function (flags) {
    return Promise.resolve()
        .then(() => {
            return checkMaster(flags)
        })
        .then(() => {
            return fetchRemote(flags)
        })
}