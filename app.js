var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var defaultrouter = require('./routes/index.js')
var todorouter = require('./routes/todos.js');
var usersRouter = require('./routes/users.js');

var app = express();

console.log(`starting app and keeping it running with 'nodemon'`)

let options = {
  origin: 'https://flamboyant-banach-405870.netlify.app'
}
app.use(cors(options))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',defaultrouter);
app.use('/todos', todorouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('inside app.use with generating 404 error')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('inside error handler')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;