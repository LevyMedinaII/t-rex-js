#!/usr/bin/env node
'use strict'
/**
 * Require dependencies
 *
 */

const program = require('commander')
const chalk = require('chalk')
const pkg = require('./package.json')
const inquirer = require('inquirer')
const create = require('./commands/create')


program.version(pkg.version)

program.command('create').action(create)
program.parse(process.argv)

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help()