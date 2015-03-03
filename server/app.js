// modules ===========================================

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();


var pg = require('pg')
var http = require('http')
var port = 5433;
var host = '127.0.0.1';
var server = http.createServer(function(req, res){
if(req.method == 'POST') {
insert_records(req,res);
}
else if(req.method == 'GET') {
list_records(req,res);
}
else if(req.method == 'PUT') {
update_record(req,res);
}
else if(req.method == 'DELETE') {
delete_record(req,res);
}
})
server.on('listening', function(){
    console.log('ok, server is running');
});

server.listen(port,host);

var conString = "pg://addisonlee:addisonlee@localhost:5432/urbinsight";
var client = new pg.Client(conString);
client.connect(function(err){
    if(err == null){
        console.log('Successful Connection')
    } else {
        console.log(err)
    }
});

var insert_records = function(req, res){
    //Drop table if it exists
    client.query("CREATE TABLE users(firstname varchar(64), lastname varchar(64))");
    client.query("INSERT INTO users(firstname, lastname) values($1, $2)", ['Ashoka', 'Finley']);
    client.query("INSERT INTO users(firstname, lastname) values($1, $2)", ['Dave', 'Ron']);
}





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
