#!/usr/bin/env node
'use strict'
const program = require('commander')
const chalk = require('chalk')
const pkg = require('./package.json')
const inquirer = require('inquirer')
const add = require('./commands/add/add')
const create = require('./commands/create/create')
const generate = require('./commands/generate/generate')
const install = require('./commands/install/install')
const run = require('./commands/run/run')

program.version(pkg.version)

program.command('create').action(create)
program.command('add').action(add)
// program.command('generate').action(generate)
program.command('install').action(install)
program.command('run').action(run)

program.parse(process.argv)

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help()