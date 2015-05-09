var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var db = require('../../database');
var bcrypt = require('bcrypt')
var Users = db.users;
var jwt = require('jwt-simple');

var auth = {

  login: function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {

      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

  // Fire a query to your DB and check if the credentials are valid
  auth.validate(username, password, function (param){
    if(!param){
        res.status(401);
        res.json({
         "status": 401,
         "message": "Invalid credentials"
        });
      return;
    }
    if(param){
      res.json(genToken(param));
      return;
    }
  });

  // if (!dbUserObj) { // If authentication fails, we send a 401 back
  //   console.log(dbUserObj)
  //   res.status(401);
  //   res.json({
  //     "status": 401,
  //     "message": "Invalid credentials"
  //   });
  //   return;
  // }

  // if (dbUserObj) {
  //   // If authentication is success, we will generate a token
  //   // and dispatch it to the client
  //   res.json(genToken(dbUserObj));
  // }

  },

  validate: function(username, password, callback){
    // passport.use(new LocalStrategy(
    //   function(username, password, done){
        Users.findOne({
          'username' : username
        }, function (err, user) {
          debugger;
        // If there's an error, log it and return to user
          if (err) {
            console.log('User not found')
            res.status(500).json({
              'message': 'Invalid username/password'
            })
            callback(err);
          }
          if (!user) {
            console.log('Incorrect username.')
            // return done(null, false, { message: 'Incorrect username.' });
            callback(false);
          }
          bcrypt.compare(password, user.password, function(err, isMatch){ 
            if(isMatch){
              console.log('success')
              callback(user); 
            }
            else{
              console.log('Incorrect password')
              callback(false);
            }
          });
            
            // return done(null, false, { message: 'Incorrect password.' });
        });
    //   }
    // ));
  },

  validateUser: function(username, callback) {
    Users.findOne({
      'username' : username
    }, function (err, user) {
      if (err) {
        console.log(err)
        res.status(500).json({
          'message': 'Error'
        })
        callback(null, err)
      }
      if (!user) {
       console.log('User not found')
        res.status(500).json({
          'message': 'Invalid username/password'
        })
      }
      if (user) {
        callback(user);
      }
    })
  }
}

function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')()); // need something here

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;