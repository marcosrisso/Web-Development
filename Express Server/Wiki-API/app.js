//jshint esversion: 6

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);

// Request ALL

app.route('/articles')
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    console.log();

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send('Successfully sent');
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send('All articles deleted');
      } else {
        res.send(err);
      }
    });
  });

  // Request Specifics

  app.route('/articles/:articleTitle')

  .get(function (req, res) {
    
  });

// app.get('/articles', );
//
// app.post('/articles', );
//
// app.delete('/articles', );
//

app.listen(3000, function() {
  console.log('Server running on Port 3000');
});
