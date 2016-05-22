# git-keeper [![npm-check](http://img.shields.io/npm/dm/git-keeper.svg)](https://www.npmjs.org/package/git-keeper)
> Check for merged or outdated local or remote git branches

## Install

```bash
$ npm i -g git-keeper
```

## Requirements

* node >= 4
* git >= 2.0.0 (tested on git 2.6.3 on mac)

## Features

* Check if on master and stop if not (unless you `--force`)
* If `--remote`
..* Fetch remote 
..* Prune stale references (unless you `--skip-prune`)
* List all branches that are merged or outdated 
* If in `--interactive` mode, you can choose which branches to delete

## Usage

```bash
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
```