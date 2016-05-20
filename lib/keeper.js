'use strict'

const checkMaster = require('./actions/checkMaster')
const fetchRemote = require('./actions/fetchRemote')
const mergedLocal = require('./actions/mergedLocal')
const mergedRemote = require('./actions/mergedRemote')
const outdated = require('./actions/outdated')

module.exports = (flags) => {
    let status = false

    return Promise.resolve()
        .then(() => {
            return checkMaster(flags)
        })
        .then((_status) => {
            status = _status

            if (!flags.remote) {
                return Promise.resolve()
            }

            return fetchRemote(flags)
        })
        .then(() => {
            return flags.remote ? mergedRemote(flags, status) : mergedLocal(flags)
        })
        .then((data) => {
            return outdated(flags, status, data)
        })
}