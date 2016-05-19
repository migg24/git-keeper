'use strict'

const checkMaster = require('./actions/checkMaster')
const fetchRemote = require('./actions/fetchRemote')
const checkLocal = require('./actions/checkMergedLocal')

module.exports = (flags) => {
    return Promise.resolve()
        .then(() => {
            return checkMaster(flags)
        })
        .then(() => {
            return fetchRemote(flags)
        })
        .then(() => {
            return checkLocal(flags)
        })
}