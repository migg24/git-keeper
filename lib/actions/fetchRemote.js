'use strict'

//const chalk = require('chalk')

module.exports = function fetchRemote(flags, repo) {
    // git fetch -p
    return repo.fetch('origin', flags.skipPrune ? {} : {
        prune: true
    }).then(() => console.log(arguments)).catch(err => console.log(err))
}