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
// Comment controllers
require('./controllers/comments.js')(app);

// Set db
require("./data/reddit-db");


// // // Home
// app.get('/', (req, res) => {
//   Post.find({}).then(posts => {
//     res.render("post-index", { posts:posts });
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
// })

// New posts
app.get('/post/new', (req, res) => {
  res.render('posts-new', {});
})

// Listen
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
// Need in order to run tests
module.exports = app;
