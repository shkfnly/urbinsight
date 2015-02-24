// modules ===========================================

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//I'm not sure if I need this.
// var router = express.Router();



/**
* Route Imports
*/
// var routes = require('./routes/index');
// var users = require('./routes/users');
// var nodes = require('./routes/nodes');
// var signup = require('./routes/signup');

var app = express();



// implement router
// app.use(router)

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

// parse application/vnd.api+json as json ( Might not need to include)
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded ( Might need to change back to false)
app.use(bodyParser.urlencoded({ extended: true }));

// override the X-HTTP-Method-Override header in the request.
//simulate DELETE/PUT ( Might not need this anyways)
app.use(methodOverride('X-HTTP-Method-Override'));


app.use(cookieParser());


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


/**
* Development Settings
*/
// will print stacktrace
if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder    
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
* Production Settings
*/
if (app.get('env') === 'production') {
    require('newrelic');
    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
    });
});

}

/**
 * Routes
*/
var router = require('./router')(app);



// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;
