var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;


// The POST /signup route
router.post('/', function (req, res)  {
  
  // The posted information from the front-end
  var body = req.body;
  // Current time this occurred
  var time = moment().format('MMMM Do YYYY, h:mm:ss a');

  // Check to see if the user already exists
  // using their email address
  Users.findOne({
    'email' : body.email
  }, function (err, user) {
    // If there's an error, log it and return to user
    if (err) {
      console.log('Couldn\'t create new user at ' + color.red(time) + ' by ' +
                  color.red(body.email) + ' because of: ' + err);
      res.status(500).json({
        'message': 'Internal server error from signing up new user. Please contact support@urbinsight.com.'

      })
    }
    // IF the user doesn't exist, create one
    if (!user) {
      console.log('Creating a new user at ' + color.green(time) + ' with the email: ' +
                  color.green(body.email));
      var newUser = new Users({
        username: body.username,
        email: body.email,
        password: body.password1
      });
      newUser.save( function(err, savedUser) {
        if (err) {
          console.log('Problem saving the user ' + color.yellow(body.email) + ' due to ' + err);
          res.status(500).json({
            'message': 'Database error trying to sign up. Please contact support@urbinsight.com.'
          });
        }
        console.log('Successfully created new user: ' + color.green(body.email));
        res.status(201).json({
          'message': 'Successfully created new user',
          'client': _.omit(savedUser, 'password')
        });
      });
    }

    // If the user already exists....
    if (user) {
      res.status(409).json({
        'message': body.email + ' already exists!'
      });
    }
  });
});


module.exports = router;