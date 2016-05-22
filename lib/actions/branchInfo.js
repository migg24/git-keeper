'use strict'

const _ = require('lodash')
const execa = require('execa')
const moment = require('moment')

module.exports = (flags, status, data) => {
    // fetch info for each ref
    // using '~~' as separator because '~' is illegal in branch names: http://stackoverflow.com/a/3651867/387573
    return execa('git',
        [
            'for-each-ref',
            flags.remote ? 'refs/remotes/' : 'refs/heads/',
            '--format=%(refname:short)~~%(committerdate:iso8601)~~%(committerdate:relative)~~%(objectname:short)'
        ]
    ).then((result) => {
        // collect branch infos from result.stdout
        let branches = _.map(
            result.stdout.split(/\r?\n/g),
            item => {
                let tmp = item.trim().split('~~')

                return {
                    name: tmp[0],
                    rel: tmp[2],
                    outdated: moment(tmp[1]).add(flags.days, 'days').isBefore(moment()),
                    merged: data.merged.indexOf(tmp[0]) !== -1,
                    version: tmp[3]
                }
            }
        )

        // only return branches that are not the current branch and either merged or outdated
        return _.filter(
            branches,
            item => item.name !== status.current && (item.merged || item.outdated)
        )
    })
}