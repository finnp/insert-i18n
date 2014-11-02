# insert-i18n
![insert-i18n](https://nodei.co/npm/insert-i18n.png)

Utility for inlining i18n data into HTML files from json files. You can use it
programmatically or as CLI. 

It is inspired by [this html](https://github.com/jsconfcn/jingjs/blob/gh-pages/index.html#L225-L402) 
and initially written for the [NodeSchool website](https://github.com/nodeschool/nodeschool.github.io/issues/141).

```
Usage: insert-i18n <html-files-glob> <languages-dir>
```

Every html file has to include a tag with the id `i18n` like this
```html
  <span id="i18n" style="display:none; visibility:hidden;">
```

That is where the translations are going to be inserted.

The script will look in the given `languages-dir` for a `languages.json` file.
For every key in that JSON file it will look for a `<key>.json` file. This key/value
data is going to be inserted like this:

1. The script looks for all `data-18n` attributes in each html file from the glob
2. For every one of these attributes it will look for the key in all the given languages
3. It will add a span `<span lang="<lang>" data-i18n="<key>"><value></span>` like this to the `#i18n` element.


