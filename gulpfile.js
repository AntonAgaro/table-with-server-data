const {src, dest, watch, parallel, series } = require('gulp');
const scss   = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const webpack = require('webpack-stream');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
}

//Сборка js через webpack

function buildJs() {
  return src([
    "./app/js/main.js",
  ])
  .pipe(webpack({
    mode: 'development',
    output: {
        filename: 'script.js'
    },
    watch: false,
    devtool: "source-map",
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                    debug: true,
                    corejs: 3,
                    useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
  }))
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function buildProdJs() {
  return src("./app/js/main.js")
    .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'script.js'
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env', {
                        corejs: 3,
                        useBuiltIns: "usage"
                    }]]
                  }
                }
              }
            ]
          }
    }))
    .pipe(dest('dist/js'));
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
    .pipe(dest('dist/images'))
}

//Скриптами занимается webpack
// function scripts() {
//   return src([
//     'app/js/main.js',
//   ])
//   .pipe(concat('main.min.js'))
//   .pipe(uglify())
//   .pipe(dest('app/js'))
//   .pipe(browserSync.stream())
// }

function styles() {
  return src('app/scss/style.scss') //находим файл с которым работаем
    .pipe(scss({outputStyle: 'compressed'})) //Что - то делаем
    .pipe(concat('style.min.css')) //Именуем
    .pipe(autoprefixer({grid: true}))
    .pipe(dest('app/css')) // выкидываем обработанный
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    // 'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles); // ** - слежение за всеми папками и файлами, сколько угодно вложенностей
  // watch(['app/js/**/*.js','!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
  watch(['app/js/**/*.js', '!app/js/script.js'], buildJs);

}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
// exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.buildJs = buildJs;
exports.buildProdJs = buildProdJs;


exports.build = series(cleanDist, images, build, buildProdJs);
exports.default = parallel(buildJs, styles, browsersync, watching);