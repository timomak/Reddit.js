const express = require('express')
const app = express()
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

// Adding controllers
require("./controllers/posts.js")(app);

// Set db
require("./data/reddit-db");

// // Home
// app.get('/', (req, res) => {
//   // res.render('post-index', { msg: 'This is homeview' });
//   res.redirect('/posts-index')
// })

// New posts
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})

// Listen
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
