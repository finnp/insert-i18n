#!/usr/bin/env node

var argv = process.argv.slice(2)

var insert = require('./')

if(argv.length < 2) {
  console.error('Usage: insert-i18n <html-files-glob> <languages-dir>')
  process.exit()
}

insert(argv[0], argv[1])