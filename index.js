#!/usr/bin/env node
'use strict';
/**
 * Require dependencies
 *
 */

const program = require('commander'),
    chalk = require('chalk'),
    exec = require('child_process').exec,
    pkg = require('./package.json'),
    inquirer = require('inquirer')
    list = require('./commands/list');

program
    .version(pkg.version)
    .command('list [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long','Long list format')
    .action(list);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();