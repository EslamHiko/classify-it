const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  var token = req.headers['authorization'];
  token = token.replace('Bearer ','')
  console.log(token)
  console.log(token)

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, "top_secret");
    console.log(decoded)
    // Add user from payload
    req.user = (decoded);
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: String,
  facebook: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


const User = mongoose.model('User', userSchema);

module.exports = User;
