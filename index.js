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
    
    var $i18n = cheerio.load('<span id="i18n" style="display:none; visibility:hidden;"></span>')

    console.log(file);
    var $ = cheerio.load(fs.readFileSync(file))
    $('[data-i18n]').each(function (i, el) {
      var key = el.attribs['data-i18n']
      for(lang in langs) {
        // console.log(lang, langs[lang][key])
        $i18n('#i18n').append(
          $i18n('<span>')
            .attr('lang', lang)
            .attr('data-i18n', key)
            .text(langs[lang][key])
        )
      }
    })
    $('body').append($i18n.html())
    fs.writeFileSync('./test.html', $.html())
    // console.log($i18n.html())
  })

})

