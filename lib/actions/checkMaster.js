'use strict'

module.exports = function checkMaster(repo) {
    return repo.getCurrentBranch().then(reference => {
        if (reference.shorthand() !== 'master') {
            throw new Error('You are currently not on master branch. Use --force to continue.')
        }
    })
}