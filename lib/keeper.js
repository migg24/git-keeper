'use strict'

const checkMaster = require('./actions/checkMaster')
const fetchRemote = require('./actions/fetchRemote')
const mergedLocal = require('./actions/mergedLocal')
const mergedRemote = require('./actions/mergedRemote')
const branchInfo = require('./actions/branchInfo')

module.exports = (flags) => {
    let status = false

    return Promise.resolve()
        .then(() => {
            // check if on master
            return checkMaster(flags)
        })
        .then((_status) => {
            // store status from git status
            status = _status

            // fetch remote if --remote
            if (!flags.remote) {
                return Promise.resolve()
            }

            return fetchRemote(flags)
        })
        .then(() => {
            // collect merged branches
            return flags.remote ? mergedRemote(flags, status) : mergedLocal(flags)
        })
        .then((data) => {
            // collect branch info
            return branchInfo(flags, status, data)
        })
}