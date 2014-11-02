var cheerio = require('cheerio')
var fs = require('fs')
var glob = require('glob')
var path = require('path')

var htmlGlob = '*.html'
var langsDir = './languages'

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
          $('\n<span>')
            .attr('lang', lang)
            .attr('data-i18n', key)
            .text(value)
        )
      }
    })
    fs.writeFileSync('./test.html', $.html())
    // console.log($i18n.html())
  })

})

