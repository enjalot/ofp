var express = require('express');

var expressSession = require('express-session');
var serveStatic = require('serve-static');
var favicon = require('serve-favicon');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var highway = require('racer-highway');

module.exports = function (store, apps, error, publicDir, cb){

  var connectStore = require('connect-mongo')(expressSession);
  var sessionStore = new connectStore({url: process.env.MONGO_URL});

  var session = expressSession({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    cookie: process.env.SESSION_COOKIE,
    saveUninitialized: true,
    resave: true
  });

  var handlers = highway(store, {session: session});

  var expressApp = express()
    .use(favicon(publicDir + '/img/favicon.ico'))
    .use(compression())
    .use(serveStatic(publicDir))
    .use(store.modelMiddleware())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(session)
    .use(handlers.middleware)
    .use(createUserId);

  apps.forEach(function(app){
    expressApp.use(app.router());
  });

  expressApp.use(require('./routes'));

  expressApp
    .all('*', function (req, res, next) { next('404: ' + req.url); })
    .use(error);

  cb(expressApp, handlers.upgrade);
}

function createUserId(req, res, next) {
  var model = req.getModel();
  var userId = req.session.userId;
  if (!userId) userId = req.session.userId = model.id();
  model.set('_session.userId', userId);
  next();
}