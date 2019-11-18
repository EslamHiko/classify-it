const { promisify } = require('util');
const crypto = require('crypto');

const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.json({success:false});
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {

      return res.json({success:false});
    }
    const token =jwt.sign({data: user}, 'secret',
    { expiresIn: 60 * 60 * 60});
    return res.json({success:true,token:token})
  })(req, res, next);
};



/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.json({success:false,msg:'All Fields are required!'});
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name:req.body.email,
      gender:req.body.gender,
      location:req.body.locaton
    },
    role:'user'
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.json({success:false,msg: 'Account with that email address already exists.'});
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.json({success:true});
      });
    });
  });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Account Management'
  });
};


exports.update = (req, res, next) => {

  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  console.log(req.user)
  User.findById(req.user.data._id, (err, user) => {
    if (err) { return next(err); }
    if (user.email !== req.body.email){
      User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
          return res.json({success:false,msg: 'Account with that email address already exists.'});
        }
      });
     }
    user.email = req.body.email;
    user.profile.name = req.body.name;
    user.profile.gender = req.body.gender;
    user.profile.location = req.body.location;
    if(req.body.password)
      user.password = req.body.password;
    user.save((err,user) => {
      if (err) {
        return res.json({success:false});
      }
      const token =jwt.sign({data: user}, 'secret',
      { expiresIn: 60 * 60 * 60});
      return res.json({success:true,token})
    });
  });
};


/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
  const { provider } = req.params;
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user[provider.toLowerCase()] = undefined;
    const tokensWithoutProviderToUnlink = user.tokens.filter((token) =>
      token.kind !== provider.toLowerCase());
    // Some auth providers do not provide an email address in the user profile.
    // As a result, we need to verify that unlinking the provider is safe by ensuring
    // that another login method exists.
    if (
      !(user.email && user.password)
      && tokensWithoutProviderToUnlink.length === 0
    ) {

      res.json({success:true});
    }
    user.tokens = tokensWithoutProviderToUnlink;
    user.save((err) => {
      if (err) { return next(err); }
      res.json({success:true});
    });
  });
};

exports.getUsers = async (req,res) => {
  const users = await User.find({});

  const map = [];
  users.forEach((user) => {
    console.log(req.user)
    console.log(user)
    if(req.user.data._id != user._id)
      map.push(user);
  });
  res.json(map);
}

exports.getUser = async (req,res) => {
  const user = await User.findById(req.params.id);


  res.json(user);
}
exports.save = (req,res)=>{

  User.findById(req.body.id, (err, user) => {
    if(!user)
      user = new User();
    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.profile.gender = req.body.gender;
    user.profile.location = req.body.location;
    if(req.body.password)
      user.password = req.body.password;
    user.save((err) => {
      if (err) {
        return res.json(err);
      }

      res.json({success:true,user})
    });
  });
}



exports.delete = (req,res)=>{
  user.deleteOne({_id:req.body.id}, (err, user) => {
    if (err) {
      return res.json(err);
    }
    res.json({success:true})
  });
}
