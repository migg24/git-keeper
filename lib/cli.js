'use strict'

const meow = require('meow')
const keeper = require('./keeper')

const cli = meow(`
	Usage
	  $ git-keeper <options>
 
	Options
	  -i, --interactive    Interactive mode
	  -s, --skip-prune     Skip pruning remote branches
	  -S, --skip-outdated  Skip outdated branches
	  -d, --days <n>       Number of days before branches are outdated (default: 30) 
 
	Examples
	  $ git-keeper         # See which branches are merged or outdated
	  $ git-keeper -i      # Interactively choose branches to remove from merged and outdated branches
	  $ git-keeper -iS     # Interactively choose branches to remove from merged branches
  
`, {
    alias: {
        i: 'interactive',
        s: 'skip-prune',
        S: 'skip-outdated',
        d: 'days'
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

keeper(cli.flags).then(currentState => {
    let handle = cli.flags.interactive ?
        require('./output/interactive') :
        require('./output/static')

    return handle(currentState)
}).catch(err => {
    console.log(err.message)
    process.exit(1)
})