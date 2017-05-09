var gulp = require('gulp');
var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");

gulp.task('build', ['webpack'], function () {
});

gulp.task('server', ['webpack-server'], function () {
});

gulp.task('webpack', function (done) {
  webpack(require('./webpack.config.prod.js'),(err) => {
    done(err)
  })
}
)

gulp.task('webpack-server', function () {
  try {
    var express = require('express');
    var app = express();
    var compiler = webpack(require('./webpack.config.js'));
    app.use(webpackMiddleware(compiler, {
      publicPath: "/",
      noInfo: true
    }));
    app.use(require('webpack-hot-middleware')(compiler));

    var server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('App listening at http://%s:%s', host, port);
    });
  } catch (err) {
    console.log(err);
  }
}
)