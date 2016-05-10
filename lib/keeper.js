'use strict'

const checkMaster = require('./actions/checkMaster')
const fetchRemote = require('./actions/fetchRemote')

Promise.series = function(methods) {
    var promise = Promise.resolve()

    return Promise.all(methods.map(method => {
        return promise = promise.then(method)
    }))
}

module.exports = function (flags, repo) {
    return Promise.series([
        checkMaster(flags, repo),
        fetchRemote(flags, repo)
    ])
}