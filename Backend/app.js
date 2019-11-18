/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const lusca = require('lusca')
const flash = require('express-flash');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const jwt = require('jsonwebtoken');
var cors = require('cors')

const https = require('https');
const fs = require('fs')
/**
 * Controllers (route handlers).
 */
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const listController = require('./controllers/list');

const categoryController = require('./controllers/category');
console.log(categoryController)
const postsController = require('./controllers/posts');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');
const config = require('./config/config');
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl','server.cert')),
  key:fs.readFileSync(path.join(__dirname, 'ssl','server.key'))
}

/**
 * Create Express server.
 */
const app = express();
app.use(cors())

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(config.MongoURI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', config.port || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: config.MongoURI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
/*
 * Primary app routes.
 */

app.post('/login', userController.postLogin);
app.post('/register', userController.postSignup);

app.post('/edit', passportConfig.isAuthenticated,userController.update);


app.get('/', apiController.getFacebook);

app.get('/user', passportConfig.isAuthenticated,(req,res)=>{
  return res.json(req.user);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'https://localhost:3000/' }), (req, res) => {
  // we can set expiration time using sync

  const token =jwt.sign({data: req.user}, 'secret',
  { expiresIn: 60 * 60 * 60});
  res.redirect('http://localhost:3000/token?token='+token);
});



app.get('/posts',  passportConfig.isAuthenticated, postsController.getPosts);
app.post('/posts/save',  passportConfig.isAuthenticated, postsController.save);
app.post('/posts/delete',  passportConfig.isAuthenticated, postsController.delete);
app.get('/posts/:id',  passportConfig.isAuthenticated, postsController.getPost);


app.get('/lists',  passportConfig.isAuthenticated, listController.getLists);
app.post('/lists/save',  passportConfig.isAuthenticated, listController.save);
app.post('/lists/delete',  passportConfig.isAuthenticated, listController.delete);
app.get('/lists/:id',  passportConfig.isAuthenticated, listController.getList);


app.get('/cats', categoryController.getCats);
app.post('/cats/save',  passportConfig.isAuthenticated, categoryController.save);
app.post('/cats/delete',  passportConfig.isAuthenticated, categoryController.delete);
app.get('/cats/:id',  passportConfig.isAuthenticated, categoryController.getCat);

app.get('/users', passportConfig.isAuthenticated,  passportConfig.isSadmin, userController.getUsers);
app.post('/users/save',  passportConfig.isAuthenticated, passportConfig.isSadmin, userController.save);
app.post('/users/delete',  passportConfig.isAuthenticated, passportConfig.isSadmin, userController.delete);
app.get('/users/:id',  passportConfig.isAuthenticated, passportConfig.isSadmin, userController.getUser);

/**
 * Start Express server.
 */
https.createServer(httpsOptions, app).
listen(app.get('port'), () => {
  console.log('App is running at https://localhost:'+app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
