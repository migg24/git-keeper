'use strict'

const meow = require('meow')
const keeper = require('./keeper')

const cli = meow(`
	What it does:
	  - Check if on master and stop if not (unless you --force)
	  - If --remote
	    - Fetch remote 
	    - Prune stale references (unless you --skip-prune)
	  - List all branches that are merged or outdated 
	  - If in --interactive mode, you can choose which branches to delete

	Usage
	  $ git-keeper <options>
 
	Options
	  -i, --interactive    Interactive mode
	  -s, --skip-prune     Skip pruning remote branches
	  -r, --remote         Check remote branches
	  -f, --force          Force continuation if not on master branch
	  -d, --days <n>       Days before branches are outdated (default: 30)
 
	Examples
	  $ git-keeper         # See which local branches are merged or outdated
	  $ git-keeper -r      # See which remote branches are merged or outdated
	  $ git-keeper -i      # Interactively choose local branches to remove 
	  $ git-keeper -ir     # Interactively choose remote branches to remove 
	  $ git-keeper -d 10   # Show branches as outdated when they are at least 10 days old 
  
`, {
    alias: {
        i: 'interactive',
        s: 'skip-prune',
        S: 'skip-outdated',
        d: 'days',
        r: 'remote',
        f: 'force'
    },
    default: {
        days: '30'
    },
    boolean: [
        'interactive',
        'skip-prune',
        'skip-outdated',
        'remote',
        'force'
    ]
})

keeper(cli.flags).then(results => {
    let handle = cli.flags.interactive ?
        require('./output/interactive') :
        require('./output/static')

    // show results in interactive or static mode
    return handle(cli.flags, results)
}).catch(err => {
    console.log(err.message)
    process.exit(1)
})
