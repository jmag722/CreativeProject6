var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var mongoose = require('mongoose');
var userProfiles = mongoose.model('User');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res) {
  console.log("/ Route");
  //    console.log(req);
  console.log(req.session);
  if (req.session.user) {
    console.log("/ Route if user");
    res.render('index', {
      username: req.session.username,
      msg: req.session.msg,
      high: req.session.high,
      wei: req.session.wei,
      pickup: req.session.pickup,
      picUrl: req.session.picUrl
    });
  }
  else {
    console.log("/ Route else user");
    req.session.msg = 'Access denied!';
    res.redirect('/login');
  }
});
router.get('/user', function(req, res) {
  console.log("/user Route");
  if (req.session.user) {
    res.render('user', { msg: req.session.msg });
  }
  else {
    req.session.msg = 'Access denied!';
    res.redirect('/login');
  }
});
router.get('/signup', function(req, res) {
  console.log("/signup Route");
  if (req.session.user) {
    res.redirect('/');
  }
  res.render('signup', { msg: req.session.msg });
});
router.get('/login', function(req, res) {
  console.log("/login Route");
  if (req.session.user) {
    res.redirect('/');
  }
  res.render('login', { msg: req.session.msg });
});
router.get('/logout', function(req, res) {
  console.log("/logout Route");
  req.session.destroy(function() {
    res.redirect('/login');
  });
});
router.get('/profiles', function(req, res) {
  console.log("/profiles route");
  if(req.session.user) {
    res.render('profiles', { msg: req.session.msg });
  }
  else {
    req.session.msg = 'Access denied!';
    res.redirect('/login');
  }
});
router.get('/profiles/viewer', function(req, res, next) {
    console.log('profiles viewer route');
    if(req.session.user) {
      userProfiles.find(function(err, data) {
        if(err) {
          return next(err);
        }
        res.json(data);
      });
    }
    else {
      req.session.msg = "Access denied!";
      res.redirect('/login');
    }
});
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;
