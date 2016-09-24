var fs = require('fs')
var jsonEditor = require('gulp-json-editor')
var bozon = require('bozon/lib/bozon');

bozon.hooks.push(
  'html',
  'css',
  'js',
  'js:main'
)

bozon.task('html', function () {
  return bozon.src('*.html').pipe(bozon.dest())
})

bozon.task('css', function () {
  return bozon.src('css/*.css').pipe(bozon.dest('css'))
})
bozon.task('js', function () {
  return bozon.src('js/**/*.js').pipe(bozon.dest('js'))
})

bozon.task('js:main', function () {
  return bozon.src('main.js').pipe(bozon.dest())
})

bozon.task('prepare:app', bozon.hooks, function () {
  var settings = new bozon.Settings()
  fs.stat(bozon.sourcePath('node_modules'), function (err, stat) {
    if (!err) {
      bozon.spawnSync('cp', [
        '-r',
        bozon.sourcePath('node_modules'),
        bozon.destinationPath()
      ])
    }
  })
  return bozon.src('package.json').pipe(jsonEditor({
    settings: settings.get()
  })).pipe(bozon.dest())
})