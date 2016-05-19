'use strict'

const checkMaster = require('./actions/checkMaster')
const fetchRemote = require('./actions/fetchRemote')
const checkLocal = require('./actions/checkMergedLocal')
const checkRemote = require('./actions/checkMergedRemote')

module.exports = (flags) => {
    let remote = false

    return Promise.resolve()
        .then(() => {
            return checkMaster(flags)
        })
        .then((tracking) => {
            remote = tracking
            return fetchRemote(flags)
        })
        .then(() => {
            return flags.remote ? checkRemote(flags, remote) : checkLocal(flags)
        })
}