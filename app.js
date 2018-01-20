var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var jwt    = require('jsonwebtoken');
var index = require('./routes/index');
var login = require('./routes/api/login');
var users = require('./routes/users');
var api =require('./routes/api.route');
var config = require('./config/config');
var app = express();




//mongo connection
mongoose.Promise=bluebird;
mongoose.connect(config.database,{useMongoClient:true})
    .then(()=>{
            console.log('Connection to mongo at db todoapp was succesfull')
          })
    .catch(()=>{
    console.log('error while trying to connect to mongodb')
});
app.set('superSecret',config.secret);

//CORS configuration
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,headerName");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login',login);
// route middleware to verify a token
app.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(req.headers);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
app.use('/', index);
app.use('/api',api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
