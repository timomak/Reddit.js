// These must go here before app = express()
require('dotenv').config();
const express = require('express')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
app.use(cookieParser()); // after app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');

// Use Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Check if user is loggen in. Must go before adding routes.
// This doesn't work properly on safari.
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
    console.log("Logged in");
  } else {
    console.log("Not Logged in");
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// Adding controllers
require("./controllers/posts.js")(app);
// Comment controllers
require('./controllers/comments.js')(app);
// Authorization
require('./controllers/auth.js')(app);

// Set db
require("./data/reddit-db");

// New posts
app.get('/post/new', (req, res) => {
  var currentUser = req.user;
  res.render('posts-new', { currentUser });
})

// Listen
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
// Need in order to run tests
module.exports = app;
