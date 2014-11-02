var cheerio = require('cheerio')
var fs = require('fs')
var glob = require('glob')
var path = require('path')

module.exports = inserti18n

function inserti18n(htmlGlob, langsDir) {
  var langs = JSON.parse(fs.readFileSync(path.resolve(langsDir, 'languages.json')))

  for(lang in langs) {
    langs[lang] = JSON.parse(fs.readFileSync(path.resolve(langsDir, lang + '.json')))
  }


  glob(htmlGlob, function (err, files) {
    if(err) throw err;
    files.forEach(function (file) {

      console.log(file);
      var $ = cheerio.load(fs.readFileSync(file))
      $('[data-i18n]').each(function (i, el) {
        var key = el.attribs['data-i18n']
        for(lang in langs) {
          var value = langs[lang][key]
          if(!value) {
            console.error('Missing for', lang, ':', key)
            continue
          }
          $('#i18n').append(
            $('<span>') // formatted '\n<span>'
              .attr('lang', lang)
              .attr('data-i18n-text', key) // not 'data-i18n' so they don't get selected
              .text(value)
          )
        }
      })
      fs.writeFileSync(file, $.html())
    })

  })
}

