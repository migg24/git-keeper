'use strict'

const meow = require('meow')
const keeper = require('./keeper')
const Git = require('nodegit')

const cli = meow(`
	Usage
	  $ git-keeper <options>
 
	Options
	  -i, --interactive    Interactive mode
	  -s, --skip-prune     Skip pruning remote branches
	  -S, --skip-outdated  Skip outdated branches
	  -d, --days <n>       Days before branches are outdated (default: 30) 
 
	Examples
	  $ git-keeper         # See which branches are merged or outdated
	  $ git-keeper -i      # Interactively choose branches to remove 
	                       # from merged and outdated branches
	  $ git-keeper -iS     # Interactively choose branches to remove 
	                       # from merged branches
  
`, {
    alias: {
        i: 'interactive',
        s: 'skip-prune',
        S: 'skip-outdated',
        d: 'days',
        f: 'force'
    },
    default: {
        days: '30'
    },
    boolean: [
        'interactive',
        'skip-prune',
        'skip-outdated'
    ]
})

Git.Repository.open(process.cwd()).then(repository => {
    keeper(cli.flags, repository).then(branches => {
        let handle = cli.flags.interactive ?
            require('./output/interactive') :
            require('./output/static')

        return handle(branches)
    }).catch(err => {
        console.log(err.message)
        process.exit(1)
    })    
}).catch(err => {
    console.log(err.message)
    process.exit(1)
})